import styled, { keyframes, css } from "styled-components";

interface WrapperProps {
  showAnimation: boolean;
}

const SmoothIntro = keyframes`
	from {opacity: 0;}
	to {opacity: 1;}
`;

export const Wrapper = styled.div<WrapperProps>`
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${(props) =>
    props.showAnimation
      ? css`
          ${SmoothIntro} 1s
        `
      : "none"};
`;
