import React from "react";
import { StyledInput, Label } from "./style";

interface Props {
  placeholder: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler;
  isFilled?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  id,
  children,
  value,
  onChange,
  isFilled = false,
}) => {
  return (
    <div>
      <Label htmlFor={id}>{children}</Label>
      <StyledInput
        isFilled={isFilled}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
