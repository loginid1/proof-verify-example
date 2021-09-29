import React, { useState } from "react";
import BaseView from "../../components/BaseView/";
import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Backdrop from "../../components/Backdrop/";
import { Iframe } from "../../components/Iframe/style";
import { PageNames } from "../../enums/";
import Identity from "../../services/identity";
import { Form } from "../style";

const Login = () => {
  const [username, setUsername] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  /*
   * Register a user (no credential) and then initalize and finalize the proof flow
   */
  const handleRegisterAndProof = async () => {
    try {
      setIsLoading(true);
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
              const validPageNames = [
                PageNames.QA_CODE_PAGE,
                PageNames.VIDEO_DEVICE_NOT_FOUND,
              ];

              if (!validPageNames.includes(pageName)) {
                reject(event.data);
                setIframeUrl("");
                controller.abort();
              }
            }
          },
          { capture: false, signal: controller.signal }
        );
      });

      const result = await Identity.complete({ username, credentialUUID });
      console.log(result);

      setIsLoading(false);
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
        <Button onClick={handleRegisterAndProof}>Login</Button>
      </Form>
      {iframeUrl && <Iframe src={iframeUrl} />}
      <Backdrop display={isLoading} />
    </BaseView>
  );
};

export default Login;
