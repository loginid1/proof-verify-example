import styled, { keyframes } from "styled-components";

const SmoothIntro = keyframes`
	from {opacity: 0;}
	to {opacity: 1;}
`;

export const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${SmoothIntro} 1s;
`;
