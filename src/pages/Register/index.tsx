import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import WebSDK from "@loginid/sdk";
import WebSDK from "../../utils/WebSDK";
import BaseView from "../../components/BaseView/";
import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Backdrop from "../../components/Backdrop/";
import Toast from "../../components/Toast/";
import Modal from "../../components/Modal/";
import ProofDataComponent, { IProofData } from "../../components/ProofData/";
import { ModalMessages } from "./messages";
import { Iframe } from "../../components/Iframe/style";
import { validPageNames } from "../../enums/";
import Identity from "../../services/identity";
import Fido2 from "../../services/fido2";
import { Form } from "../style";
import env from "../../utils/env";

interface Props {
  username: string;
  handleUsername: React.ChangeEventHandler;
}

const web = new WebSDK(env.baseUrl, env.loginidWebClientId);

const Register = ({ username, handleUsername }: Props) => {
  const history = useHistory();
  const [iframeUrl, setIframeUrl] = useState("");
  const [proofData, setProofData] = useState<IProofData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [fido2Error, setFido2Error] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleError = () => {
    setErrorMessage("");
  };

  const proofFlow = async () => {
    setIsLoading(true);

    try {
      //Create a user
      await Identity.createUser(username);

      //initalize proof
      const {
        iframe_url: iframeUrl,
        credential_uuid: credentialUUID,
      } = await Identity.init(username);

      setIframeUrl(iframeUrl);

      //controller is used to remove event listener when no longer in use
      const controller = new AbortController();
      //create a postMessage event and wait for event to resolve or reject
      await new Promise((resolve, reject) => {
        window.addEventListener(
          "message",
          (event) => {
            if (event.data.success) {
              resolve(event.data);
              setIframeUrl("");
              controller.abort();
            } else {
              const { pageName } = event.data;

              if (validPageNames.has(pageName)) {
                setTimeout(() => {
                  reject(event.data);
                  setIframeUrl("");
                  controller.abort();
                }, 5000);
              }
            }
          },
          { capture: false, signal: controller.signal }
        );
      });

      const meta: IProofData = await Identity.evaluate({
        username,
        credentialUUID,
      });

      setProofData(meta);

      //wait for modal to end then continue
      await new Promise((resolve) => {
        const handler = () => {
          window.removeEventListener("proceed", handler);
          resolve(null);
        };
        window.addEventListener("proceed", handler);
      });

      setProofData(null);

      //finalize proof
      await Identity.complete({ username, credentialUUID });
    } catch (error: any) {
      throw error;
    }
  };

  const handleProof = async () => {
    try {
      await proofFlow();

      history.push("/home");
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      setModalMessage("");
    }
  };

  const handleProofAndFido2 = async () => {
    try {
      await proofFlow();

      try {
        //display modal
        setModalMessage(ModalMessages.CREATE_FIDO2_CREDENTIAL);

        //start fido2 credential without codes
        const {
          attestation_payload: attestationPayload,
        } = await Fido2.forceInit(username);

        //finalize fido2 credential
        await web.addFido2Credential(attestationPayload);

        history.push("/home");
      } catch (e) {
        console.log(e);
        setFido2Error(ModalMessages.FIDO2_GENERIC_ERROR);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      setModalMessage("");
    }
  };

  return (
    <BaseView>
      <Form onSubmit={handleNoSubmit}>
        <Title>Register</Title>
        <Input
          id="email"
          placeholder="joe@email.com"
          onChange={handleUsername}
          value={username}
          isFilled={username.length > 0}
        >
          Email
        </Input>
        <Link url="/login">Want to login?</Link>
        <Button onClick={handleProof}>Register Proof</Button>
        <Button onClick={handleProofAndFido2}>Register Proof and FIDO2</Button>
      </Form>
      <Backdrop display={isLoading} />
      {iframeUrl && <Iframe src={iframeUrl} allow="fullscreen *;camera *" />}
      {errorMessage && <Toast callback={handleError}>{errorMessage}</Toast>}
      {modalMessage && (
        <Modal>
          <div>{modalMessage}</div>
        </Modal>
      )}
      {fido2Error && (
        <Modal>
          <div>{fido2Error}</div>
          <Button onClick={() => history.push("/home")}>Continue</Button>
        </Modal>
      )}
      {proofData && (
        <Modal>
          <ProofDataComponent data={proofData} />
        </Modal>
      )}
    </BaseView>
  );
};

export default Register;
