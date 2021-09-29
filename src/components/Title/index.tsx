import React from "react";
import { H1, H3 } from "./style";

interface Props {
  large?: boolean;
}

const Title: React.FC<Props> = ({ large = false, children }) => {
  return large ? <H1>{children}</H1> : <H3>{children}</H3>;
};

export default Title;
