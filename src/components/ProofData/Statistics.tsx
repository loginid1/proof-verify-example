import { Title, MatchedData, MatchedStatistic, StatsWrapper } from "./style";
import { ReactComponent as CheckMark } from "../../images/check-mark.svg";
import { ReactComponent as XMark } from "../../images/x-mark.svg";

interface Props {
  MatchProbability: number;
  MatchScore: number;
  Matched: boolean;
}

const Statistics = ({ MatchProbability, MatchScore, Matched }: Props) => {
  return (
    <div>
      <Title>Matched Statistics</Title>
      <StatsWrapper>
        <MatchedStatistic>
          Matched Probability: {MatchProbability}
        </MatchedStatistic>
        <MatchedStatistic>Matched Score: {MatchScore}</MatchedStatistic>
        <MatchedData>
          <span>Matched:</span>
          {Matched ? <CheckMark fill="green" /> : <XMark fill="red" />}
        </MatchedData>
      </StatsWrapper>
    </div>
  );
};

export default Statistics;
