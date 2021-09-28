import React, { useState } from "react";
import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Logo from "../../components/Logo/";
import Backdrop from "../../components/Backdrop/";
import { Iframe } from "../../components/Iframe/style";
import { PageNames } from "../../enums/";
import Authid from "../../services/authid";
import { Wrapper, Left, Right, LeftInner, RightInner, Form } from "./style";

export enum Flows {
  REGISTER,
  LOGIN,
}

interface Props {
  type: Flows;
}

const Login = ({ type }: Props) => {
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
      await Authid.createUser(username);

      //initalize proof
      const { iframe_url: iframeUrl } = await Authid.init(username);

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

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const options =
    type === Flows.REGISTER
      ? {
          title: "Register",
          url: "/",
          urlMessage: "Want to login?",
          buttonMessage: "Register",
        }
      : {
          title: "Login",
          url: "/register",
          urlMessage: "Need to register?",
          buttonMessage: "Login",
        };

  return (
    <Wrapper>
      <Left>
        <LeftInner>
          <Logo />
        </LeftInner>
      </Left>
      <Right>
        <RightInner>
          <Form onSubmit={handleNoSubmit}>
            <Title>{options.title}</Title>
            <Input
              id="email"
              placeholder="joe@email.com"
              onChange={handleUsername}
              value={username}
              isFilled={username.length > 0}
            >
              Email
            </Input>
            <Link url={options.url}>{options.urlMessage}</Link>
            <Button onClick={handleRegisterAndProof}>
              {options.buttonMessage}
            </Button>
            {/*{type === Flows.REGISTER && <Button>Proof</Button>}*/}
          </Form>
        </RightInner>
      </Right>
      {iframeUrl && <Iframe src={iframeUrl} />}
      <Backdrop display={isLoading} />
    </Wrapper>
  );
};

export default Login;
