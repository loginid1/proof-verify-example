import { Wrapper } from "./style";

interface Props {
  display: boolean;
}

const Backdrop = ({ display }: Props) => {
  return display ? <Wrapper /> : null;
};

export default Backdrop;
