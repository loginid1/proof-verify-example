import React from "react";
import { Main } from "./style";

interface Props {
  onClick: React.MouseEventHandler;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ children, onClick, disabled = false }) => {
  return (
    <Main onClick={onClick} disabled={disabled}>
      {children}
    </Main>
  );
};

export default Button;
