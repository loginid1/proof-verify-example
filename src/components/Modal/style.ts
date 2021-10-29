import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  padding: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.main};

  & button {
    margin-top: 2em;
  }

  @media (max-width: 550px) {
    width 100%;
	height: 100%;
	border-radius: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  }
`;
