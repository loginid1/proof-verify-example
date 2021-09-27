import Title from "../../components/Title/";
import Input from "../../components/Input/";
import Link from "../../components/Link/";
import Button from "../../components/Button/";
import Logo from "../../components/Logo/";
import { Wrapper, Left, Right, LeftInner, RightInner, Form } from "./style";

export enum Flows {
  REGISTER,
  LOGIN,
}

interface Props {
  type: Flows;
}

const Login = ({ type }: Props) => {
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
          <Form>
            <Title>{options.title}</Title>
            <Input id="email" placeholder="joe@email.com" value="">
              Email
            </Input>
            <Link url={options.url}>{options.urlMessage}</Link>
            <Button>{options.buttonMessage}</Button>
          </Form>
        </RightInner>
      </Right>
    </Wrapper>
  );
};

export default Login;
