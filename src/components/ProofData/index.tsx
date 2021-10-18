import React, { useState } from "react";
import Button from "../Button/";
import Info from "./Info";
import Images from "./Images";
import Statistics from "./Statistics";
import { Wrapper, Buttons } from "./style";

export interface ImageData {
  Data: string;
  Description: string;
}

export interface DocumentData {
  Key: string;
  Value: string;
}

export interface Doc {
  AdditionalImages: ImageData[];
  Data: DocumentData[];
}

export interface IProofData {
  Data: {
    CurrentFacialImage: ImageData;
    Document: Doc;
    MatchProbability: number;
    MatchScore: number;
    Matched: boolean;
  };
}

interface Props {
  data: IProofData;
}

const mappedComponents = [Info, Images, Statistics];

const ProofData: React.FC<Props> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const Component = mappedComponents[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex) => {
      let index = currentIndex + 1;
      if (index >= mappedComponents.length) {
        index = 0;
      }
      return index;
    });
  };

  const handleFinish = () => {
    const event = new Event("proceed");
    window.dispatchEvent(event);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <Component {...data.Data} />
      </Wrapper>
      <Buttons>
        <Button onClick={handleNext}>Next</Button>
        <Button onClick={handleFinish}>Finish</Button>
      </Buttons>
    </React.Fragment>
  );
};

export default ProofData;
