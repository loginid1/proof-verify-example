import React from "react";
import { Main } from "./style";

interface Props {
  onClick: React.MouseEventHandler;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return <Main onClick={onClick}>{children}</Main>;
};

export default Button;
