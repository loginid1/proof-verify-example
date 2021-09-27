import styled from "styled-components";

export const Main = styled.button`
  border: none;
  width: 100%;
  font-weight: bold;
  padding: 15px 10px;
  border-radius: 5px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.main};
  transition: background 0.3s;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    background: ${(props) => props.theme.colors.mainLighter};
  }
`;
