import styled, { keyframes } from "styled-components";

interface AnimationProps {
  finish: boolean;
}

const appear = keyframes`
	0% { 
		opacity: 0; 
		transform: scale(0); 
	}
	100% {
		opacity: 1; 
		transform: scale(1); 
	}
`;

const disappear = keyframes`
	0% { 
		opacity: 1; 
		transform: scale(1); 
	}
	100% {
		opacity: 0; 
		transform: scale(0); 
	}
`;

export const Wrapper = styled.div<AnimationProps>`
  padding: 20px;
  background: #cf222e;
  position: fixed;
  z-index: 20;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  top: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.05);
  animation: ${(props) => (props.finish ? disappear : appear)} 0.3s forwards;
`;
