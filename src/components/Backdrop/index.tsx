import { Wrapper } from "./style";

interface Props {
  display: boolean;
  showAnimation?: boolean;
}

const Backdrop = ({ display, showAnimation = true }: Props) => {
  return display ? <Wrapper showAnimation={showAnimation} /> : null;
};

export default Backdrop;
