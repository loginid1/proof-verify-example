import React, { useState, useEffect } from "react";
import { Wrapper } from "./style";

const Toast: React.FC = ({ children }) => {
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    setIsFinished(false);
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  }, [children]);

  return <Wrapper finish={isFinished}>{children}</Wrapper>;
};

export default Toast;
