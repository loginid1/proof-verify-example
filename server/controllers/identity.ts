import { Request, Response } from "express";
import { LoginIdManagement } from "@loginid/node-sdk";
import fetch from "node-fetch";
import env from "../utils/env";
import { loginidError, internalErrorResponse } from "../utils/errors";
import { setJWTCookie } from "../middleware/jwt";
import { ERROR_MESSAGES } from "../enums/errors";
import { STATES } from "../enums/credentialStates";

interface EvalResponse {
  result_url: string;
  auth_token: string;
  token_type: string;
}

interface MetaDataResponse {
  Data: {
    Matched: boolean;
  };
}

const management = new LoginIdManagement(
  env.loginidBackendClientId,
  env.privateKey,
  env.baseUrl
);

const commonHeaders = { "Content-Type": "application/json" };

/*
 * Creates a user without credentials.
 */
export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const payload = await management.addUserWithoutCredentials(username);

    return res.status(200).json(payload);
  } catch (e) {
    if (e.code !== ERROR_MESSAGES.USERNAME_TAKEN) {
      console.log(e.message);
      return loginidError(res, e);
    }

    try {
      const id = await management.getUserId(username);
      const { credentials } = await management.getCredentials(id);

      for (const credential of credentials) {
        if (credential.status !== STATES.PENDING) {
          return res.status(400).json({
            message: "Username taken",
            code: ERROR_MESSAGES.USERNAME_TAKEN,
          });
        }
      }

      await management.deleteUserById(id);
      const payload = await management.addUserWithoutCredentials(username);

      return res.status(200).json(payload);
    } catch (e) {
      console.log(e.message);
      return loginidError(res, e);
    }
  }
};

/*
 * Initiate adding a new AuthID credential.
 */
export const proofInit = async (req: Request, res: Response) => {
  const {
    username,
    user_id: userId,
    credential_name: credentialName,
  } = req.body;

  const url = `${env.baseUrl}/api/native/credentials/authid/init`;

  const serviceToken = management.generateServiceToken("credentials.force_add");

  const requestPayload = {
    client_id: env.loginidBackendClientId,
    username,
    user_id: userId,
    ...(credentialName && {
      options: {
        credential_name: credentialName,
      },
    }),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { ...commonHeaders, Authorization: `Bearer ${serviceToken}` },
      body: JSON.stringify(requestPayload),
    });

    const payload = await response.json();

    return res.status(response.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};

/*
 * Returns statistics about the proof outcome.
 */
export const proofEvaluate = async (req: Request, res: Response) => {
  const {
    username,
    userId: userId,
    credential_uuid: credentialUUID,
  } = req.body;

  /*
   * Need to first evaluate proof process by comparing the document scan and selfie.
   * AuthID will provide metadata and statistics about the comparison. This can help
   * us to detemine if we can complete the proof flow or not.
   */
  const evalUrl = `${env.baseUrl}/api/native/credentials/authid/evaluate`;

  const evalServiceToken = management.generateServiceToken(
    "credentials.retrieve_sensitive"
  );

  const evalRequestPayload = {
    client_id: env.loginidBackendClientId,
    username,
    user_id: userId,
    credential_uuid: credentialUUID,
  };

  try {
    const evalResponse = await fetch(evalUrl, {
      method: "POST",
      headers: {
        ...commonHeaders,
        Authorization: `Bearer ${evalServiceToken}`,
      },
      body: JSON.stringify(evalRequestPayload),
    });

    const evalPayload = await evalResponse.json();

    if (!evalResponse.ok) {
      return res.status(evalResponse.status).json(evalPayload);
    }

    const {
      result_url: resultUrl,
      auth_token: authToken,
    } = evalPayload as EvalResponse;

    const metaDataResponse = await fetch(resultUrl, {
      method: "GET",
      headers: { ...commonHeaders, Authorization: `Bearer ${authToken}` },
    });

    const payload = await metaDataResponse.json();

    if (!metaDataResponse.ok) {
      console.log(payload);
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.PROOF_DETAILS_FAIL });
    }

    return res.status(metaDataResponse.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};

/*
 * Complete adding a new AuthID credential.
 */
export const proofComplete = async (req: Request, res: Response) => {
  const {
    username,
    user_id: userId,
    credential_uuid: credentialUUID,
  } = req.body;

  /*
   * Need to first evaluate proof process by comparing the document scan and selfie.
   * AuthID will provide metadata and statistics about the comparison. This can help
   * us to detemine if we can complete the proof flow or not.
   */
  const evalUrl = `${env.baseUrl}/api/native/credentials/authid/evaluate`;

  const evalServiceToken = management.generateServiceToken(
    "credentials.retrieve_sensitive"
  );

  const evalRequestPayload = {
    client_id: env.loginidBackendClientId,
    username,
    user_id: userId,
    credential_uuid: credentialUUID,
  };

  try {
    const evalResponse = await fetch(evalUrl, {
      method: "POST",
      headers: {
        ...commonHeaders,
        Authorization: `Bearer ${evalServiceToken}`,
      },
      body: JSON.stringify(evalRequestPayload),
    });

    const evalPayload = await evalResponse.json();

    if (!evalResponse.ok) {
      return res.status(evalResponse.status).json(evalPayload);
    }

    const {
      result_url: resultUrl,
      auth_token: authToken,
    } = evalPayload as EvalResponse;

    const metaDataResponse = await fetch(resultUrl, {
      method: "GET",
      headers: { ...commonHeaders, Authorization: `Bearer ${authToken}` },
    });

    /*
     * Need to get the Matched prop to detemine if document scan and selfie are matched,
     * according to AuthID standards.
     */
    const {
      Data: { Matched: matched },
    } = (await metaDataResponse.json()) as MetaDataResponse;

    if (!matched) {
      return res
        .status(400)
        .json({ message: "Failed match document and selfie" });
    }

    const url = `${env.baseUrl}/api/native/credentials/authid/complete`;

    const completeServiceToken = management.generateServiceToken(
      "credentials.force_add"
    );

    const requestPayload = {
      client_id: env.loginidBackendClientId,
      username,
      user_id: userId,
      credential_uuid: credentialUUID,
      activate_credential: true,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...commonHeaders,
        Authorization: `Bearer ${completeServiceToken}`,
      },
      body: JSON.stringify(requestPayload),
    });

    const payload = await response.json();

    /*
     * If /complete is successful authorize user
     */
    if (response.ok) {
      const user = {
        username,
        id: userId,
      };
      setJWTCookie(res, user);
    }

    return res.status(response.status).json(payload);
  } catch (e) {
    console.log(e.message);
    internalErrorResponse(res);
  }
};
