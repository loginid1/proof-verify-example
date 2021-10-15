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
`;
