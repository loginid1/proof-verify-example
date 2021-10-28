import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";

interface Props {
  callback: () => any;
}

const Toast: React.FC<Props> = ({ children, callback }) => {
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    setIsFinished(false);
    setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        callback();
      }, 100);
    }, 7000);
  }, [children, callback]);

  return <Wrapper finish={isFinished}>{children}</Wrapper>;
};

export default Toast;
