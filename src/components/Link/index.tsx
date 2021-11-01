import React from "react";
import { useHistory } from "react-router-dom";
import { A } from "./style";

interface Props {
  url: string;
  inline?: boolean;
}

const Link: React.FC<Props> = ({ url, children }) => {
  const history = useHistory();
  return <A onClick={() => history.push(url)}>{children}</A>;
};

export const Anchor: React.FC<Props> = ({ url, children, inline = false }) => {
  return (
    <A
      href={url}
      inline={inline}
      isAnchor
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </A>
  );
};

export default Link;
