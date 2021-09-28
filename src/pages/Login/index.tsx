import React, { useState } from "react";
import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Logo from "../../components/Logo/";
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

  const handleNoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleRegisterAndProof = async () => {
    try {
      //Create a user
      await Authid.createUser(username);

      //initalize proof
      const { iframe_url } = await Authid.init(username);
      console.log(iframe_url);
    } catch (error) {
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
    </Wrapper>
  );
};

export default Login;
