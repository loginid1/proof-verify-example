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
import { Iframe } from "../../components/Iframe/style";
import Toast from "../../components/Toast/";
import { validPageNames } from "../../enums/index";
import Token from "../../services/token";
import LoginID from "../../services/loginid";
import User from "../../services/user";
import { Form } from "../style";
import env from "../../utils/env";

interface Props {
  username: string;
  handleUsername: React.ChangeEventHandler;
}

const web = new WebSDK(env.baseUrl, env.loginidWebClientId);

const Login = ({ username, handleUsername }: Props) => {
  const history = useHistory();
  const [iframeUrl, setIframeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  /*
   * Initalize and finalize the verify flow
   */
  const handleVerify = async () => {
    try {
      setIsLoading(true);

      const serviceToken = await Token.createToken("auth.login");

      //initalize verify
      const {
        credential_uuid: credentialUUID,
        iframe_url: iframeUrl,
      } = await LoginID.authenticateWithVerifyInit(username, serviceToken);

      setIframeUrl(iframeUrl);

      //create a postMessage event and wait for event to resolve or reject
      await new Promise((resolve, reject) => {
        window.addEventListener(
          "message",
          (event) => {
            const { pageName } = event.data;

            if (event.data.success) {
              resolve(event.data);
              setIframeUrl("");
            } else if (validPageNames.has(pageName)) {
              setTimeout(() => {
                console.log(pageName);
                reject(event.data);
                setIframeUrl("");
              }, 5000);
            }
          },
          { capture: false }
        );
      });

      //finalize verify
      const { jwt } = await LoginID.authenticateWithVerifyComplete(
        username,
        credentialUUID
      );

      //validate jwt and start user session
      await User.loginUser(jwt, username);

      //go to home
      history.push("/home");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  /*
   * Authenticate with FIDO2
   */
  const handleAuthenticateWithFido2 = async () => {
    try {
      setIsLoading(true);

      const serviceToken = await Token.createToken("auth.login");

      const { jwt } = await web.authenticateWithFido2(username, {
        authorization_token: serviceToken,
      });

      await User.loginUser(jwt, username);

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
        <Title>Login</Title>
        <Input
          id="email"
          placeholder="joe@email.com"
          onChange={handleUsername}
          value={username}
          isFilled={username.length > 0}
        >
          Email
        </Input>
        <Link url="/register">Need to register?</Link>
        <Button onClick={handleVerify}>Verify</Button>
        <Button onClick={handleAuthenticateWithFido2}>Login with FIDO2</Button>
      </Form>
      {iframeUrl && <Iframe src={iframeUrl} allow="fullscreen *;camera *" />}
      {errorMessage && <Toast>{errorMessage}</Toast>}
      <Backdrop display={isLoading} />
    </BaseView>
  );
};

export default Login;
