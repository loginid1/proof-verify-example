import React from "react";
import { useHistory } from "react-router-dom";
import { A } from "./style";

interface Props {
  url: string;
}

const Link: React.FC<Props> = ({ url, children }) => {
  const history = useHistory();
  return <A onClick={() => history.push(url)}>{children}</A>;
};

export default Link;
