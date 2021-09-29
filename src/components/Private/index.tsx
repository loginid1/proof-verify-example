import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserService from "../../services/user";

enum State {
  PENDING,
  SUCCESS,
  FAILED,
}

interface Props {
  path: string;
}

const Private: React.FC<Props> = ({ children, path }) => {
  const [currentState, setCurrentState] = useState(State.PENDING);

  useEffect(() => {
    const init = async () => {
      try {
        //get user object and set it to a context or a prop to a component if need be
        await UserService.isAuthorized();
        setCurrentState(State.SUCCESS);
      } catch (e) {
        console.log(e);
        setCurrentState(State.FAILED);
      }
    };
    init();
  }, []);

  return currentState === State.PENDING ? (
    <Route path={path} exact />
  ) : currentState === State.FAILED ? (
    <Redirect to="/" />
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default Private;
