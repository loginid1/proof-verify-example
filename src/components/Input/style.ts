import styled from "styled-components";

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.8em;
`;

export const StyledInput = styled.input`
  font-weight: bold;
  width: 100%;
  outline: none;
  padding: 15px 10px;
  opacity: 0.5;
  border-radius: 5px;
  border: solid 2px rgba(0, 0, 0, 0.5);
  background-color: white;

  &:focus {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;
