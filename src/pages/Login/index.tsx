import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import WebSDK from "@loginid/sdk";
import BaseView from "../../components/BaseView/";
import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Backdrop from "../../components/Backdrop/";
import { Iframe } from "../../components/Iframe/style";
import { PageNames } from "../../enums/index";
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
            const validPageNames = [
              PageNames.QA_CODE_PAGE,
              PageNames.VIDEO_DEVICE_NOT_FOUND,
            ];

            if (event.data.success) {
              resolve(event.data);
              setIframeUrl("");
            } else if (!validPageNames.includes(pageName)) {
              console.log(pageName);
              reject(event.data);
              setIframeUrl("");
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
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
        <Button onClick={handleVerify}>Login</Button>
        <Button onClick={handleAuthenticateWithFido2}>Login with FIDO2</Button>
      </Form>
      {iframeUrl && <Iframe src={iframeUrl} />}
      <Backdrop display={isLoading} />
    </BaseView>
  );
};

export default Login;
