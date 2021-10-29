import styled from "styled-components";

export const Wrapper = styled.div`
  & button {
    max-width: 200px;
  }
`;

export const P = styled.p`
  color: black;
  font-size: 0.7em;
  text-align: center;
`;

export const Link = styled.a`
  color: ${(props) => props.theme.colors.main};
  text-decoration: none;
`;
