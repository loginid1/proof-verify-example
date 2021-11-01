import styled from "styled-components";

interface AProps {
  inline?: boolean;
  isAnchor?: boolean;
}

export const A = styled.a<AProps>`
  font-size: 0.9em;
  margin-top: 0.5em;
  width: 100%;
  display: ${(props) => (props.inline ? "inline" : "block")};
  font-weight: bold;
  text-align: right;
  cursor: pointer;
  color: ${(props) => (props.isAnchor ? props.theme.colors.main : "black")};
  text-decoration: none;
`;
