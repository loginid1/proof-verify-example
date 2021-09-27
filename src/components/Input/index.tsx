import React from "react";
import { StyledInput, Label } from "./style";

interface Props {
  placeholder: string;
  id: string;
  value: string;
}

const Input: React.FC<Props> = ({ placeholder, id, children, value }) => {
  return (
    <div>
      <Label htmlFor={id}>{children}</Label>
      <StyledInput id={id} placeholder={placeholder} value={value} />
    </div>
  );
};

export default Input;
