import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export const Left = styled.div`
  width: 40%;
  height: 100%;
  background: ${(props) => props.theme.colors.main};
  opacity: 0.8;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const LeftInner = styled.div`
  height: 80%;
  width: 80%;
  box-shadow: 5px 5px 40px 0px #000000;
  clip-path: inset(-40px 0 -40px -40px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightInner = styled.div`
  height: 80%;
  width: 85%;
  box-shadow: 5px 5px 40px 0px #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Form = styled.form`
  width: 80%;
  margin: 0 auto;
  button:first-of-type {
    margin: 5em 0 1em;
  }
`;
