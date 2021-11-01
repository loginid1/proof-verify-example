import React from "react";
import { Label, Main, Wrapper } from "./style";

interface Props {
  onChange: React.ChangeEventHandler;
  checked: boolean;
  id: string;
}

const CheckMark: React.FC<Props> = ({ id, children, onChange, checked }) => {
  return (
    <Wrapper>
      <Main
        id={id}
        type="checkbox"
        onChange={onChange}
        defaultChecked={checked}
      />
      <Label htmlFor={id}>{children}</Label>
    </Wrapper>
  );
};

export default CheckMark;
