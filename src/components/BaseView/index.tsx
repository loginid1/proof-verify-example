import React from "react";
import Logo from "../../components/Logo/";
import { Wrapper, Left, Right, LeftInner, RightInner } from "./style";

const BaseView: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Left>
        <LeftInner>
          <Logo />
        </LeftInner>
      </Left>
      <Right>
        <RightInner>{children}</RightInner>
      </Right>
    </Wrapper>
  );
};

export default BaseView;
