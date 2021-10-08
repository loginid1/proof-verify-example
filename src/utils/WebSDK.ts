import { base64ToBuffer, bufferToBase64 } from "./encodings";

type ServiceToken = string;

interface Options {
  authorization_token: ServiceToken;
}

export default class WebSDK {
  private readonly baseUrl: string;
  private readonly clientId: string;
  private readonly commonHeaders = { "Content-Type": "application/json" };

  constructor(baseUrl: string, clientId: string) {
    this.baseUrl = baseUrl;
    this.clientId = clientId;
  }

  async registerWithFido2(username: string, options: Options) {
    const { authorization_token: serviceToken } = options;
    const initPayload = {
      client_id: this.clientId,
      username,
    };

    const initResponse = await fetch(
      `${this.baseUrl}/api/native/register/fido2/init`,
      {
        method: "POST",
        headers: {
          ...this.commonHeaders,
          Authorization: `Bearer ${serviceToken}`,
        },
        body: JSON.stringify(initPayload),
      }
    );

    const init = await initResponse.json();

    if (!initResponse.ok) {
      throw init;
    }

    const { attestation_payload: attestationPayload } = init;

    const {
      credential_uuid: credentialUUID,
      ...publicKey
    } = attestationPayload;

    const { challenge } = publicKey;
    publicKey.challenge = base64ToBuffer(publicKey.challenge);
    publicKey.user.id = base64ToBuffer(publicKey.user.id);
    if (publicKey.excludeCredentials) {
      for (const credential of publicKey.excludeCredentials) {
        credential.id = base64ToBuffer(credential.id);
      }
    }

    const credential = (await navigator.credentials.create({
      publicKey,
    })) as PublicKeyCredential;
    const response = credential.response as AuthenticatorAttestationResponse;

    // Complete the registration flow
    const completePayload = {
      client_id: this.clientId,
      username,
      attestation_payload: {
        challenge,
        credential_uuid: credentialUUID,
        credential_id: bufferToBase64(credential.rawId),
        client_data: bufferToBase64(response.clientDataJSON),
        attestation_data: bufferToBase64(response.attestationObject),
      },
    };

    const completeResponse = await fetch(
      `${this.baseUrl}/api/native/register/fido2/complete`,
      {
        method: "POST",
        headers: this.commonHeaders,
        body: JSON.stringify(completePayload),
      }
    );

    const complete = await completeResponse.json();

    if (!completeResponse.ok) {
      throw complete;
    }

    return complete;
  }

  async authenticateWithFido2(username: string, options: Options) {
    const initPayload = {
      client_id: this.clientId,
      username,
    };

    const { authorization_token: serviceToken } = options;
    const initResponse = await fetch(
      `${this.baseUrl}/api/native/authenticate/fido2/init`,
      {
        method: "POST",
        headers: {
          ...this.commonHeaders,
          Authorization: `Bearer ${serviceToken}`,
        },
        body: JSON.stringify(initPayload),
      }
    );

    const init = await initResponse.json();

    if (!initResponse.ok) {
      throw init;
    }

    const { assertion_payload: assertionPayload } = init;

    const { challenge } = assertionPayload;
    assertionPayload.challenge = base64ToBuffer(assertionPayload.challenge);
    if (assertionPayload.allowCredentials) {
      for (const credential of assertionPayload.allowCredentials) {
        credential.id = base64ToBuffer(credential.id);
      }
    }

    const credential = (await navigator.credentials.get({
      publicKey: assertionPayload,
    })) as PublicKeyCredential;
    const response = credential.response as AuthenticatorAssertionResponse;

    const completePayload = {
      client_id: this.clientId,
      username,
      assertion_payload: {
        challenge,
        credential_id: bufferToBase64(credential.rawId),
        client_data: bufferToBase64(response.clientDataJSON),
        authenticator_data: bufferToBase64(response.authenticatorData),
        signature: bufferToBase64(response.signature),
      },
    };

    const completeResponse = await fetch(
      `${this.baseUrl}/api/native/register/fido2/complete`,
      {
        method: "POST",
        headers: this.commonHeaders,
        body: JSON.stringify(completePayload),
      }
    );

    const complete = await completeResponse.json();

    if (!completeResponse.ok) {
      throw complete;
    }

    return complete;
  }
}
