import styled, { keyframes } from "styled-components";

const popUp = keyframes`
	from {
		transform: scale(0);
	}

	50% {
		transform: scale(2);
	}

	to {
		transform: scale(1);
	}
`;

export const Wrapper = styled.div`
  max-height: 400px;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  font-weight: normal;
  font-size: 0.7em;
  border-spacing: 0px;
`;

export const Header = styled.th``;

export const TR = styled.tr``;

export const StatsWrapper = styled.div`
  text-align: left;
`;

export const MatchedStatistic = styled.p`
  font-size: 0.8em;
  margin: 0;
  font-weight: normal;
  color: black;
`;

export const MatchedData = styled.p`
  font-size: 0.8em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    margin-right: 1em;
  }

  & svg {
    animation: ${popUp} 0.2s;
  }
`;

export const TD = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px ${(props) => props.theme.colors.mainRGB(0.2)} solid;
  color: black;
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 1em;
  font-size: 1em;
`;

export const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Img = styled.img`
  max-width: 300px;
  margin-bottom: 1em;
`;

export const Buttons = styled.div`
  & button:last-child {
    margin-top: 0.5em;
  }

  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
`;
