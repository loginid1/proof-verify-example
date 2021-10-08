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
import { Iframe } from "../../components/Iframe/style";
import { validPageNames } from "../../enums/";
import Identity from "../../services/identity";
import Token from "../../services/token";
import User from "../../services/user";
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  /*
   * Register a user (no credential) and then initalize and finalize the proof flow
   */
  const handleRegisterAndProof = async () => {
    try {
      setIsLoading(true);
      //Create a user
      await Identity.createUser(username);

      proofFlow();
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleRegisterFido2 = async () => {
    try {
      setIsLoading(true);

      const serviceToken = await Token.createToken("auth.register");

      const { jwt } = await web.registerWithFido2(username, {
        authorization_token: serviceToken,
      });

      await User.registerUser(jwt, username);

      history.push("/home");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleProof = async () => {
    setIsLoading(true);
    proofFlow();
  };

  const proofFlow = async () => {
    try {
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

      //finalize proof
      await Identity.complete({ username, credentialUUID });

      history.push("/home");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(error.message);
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
        <Button onClick={handleRegisterAndProof}>Register and Proof</Button>
        <Button onClick={handleRegisterFido2}>Register with FIDO2</Button>
        <Button onClick={handleProof}>Proof</Button>
      </Form>
      {iframeUrl && <Iframe src={iframeUrl} allow="fullscreen *;camera *" />}
      {errorMessage && <Toast>{errorMessage}</Toast>}
      <Backdrop display={isLoading} />
    </BaseView>
  );
};

export default Register;
