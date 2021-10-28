import React from "react";
import { Wrapper, P } from "./style";
import Backdrop from "../Backdrop/";
import Button from "../Button/";
import Modal from "../Modal/";
import { ReactComponent as LightBulb } from "../../images/light-bulb.svg";
import { theme } from "../../theme/";

interface Props {
  onClick: React.MouseEventHandler;
}

const AgreeStatment = ({ onClick }: Props) => {
  return (
    <Wrapper>
      <Modal>
        <LightBulb fill={theme.colors.main} width="50px" height="50px" />
        <P>
          Clicking submit means you agree to our privacy notice <i>link</i> and
          to Login ID transferring you to our service partner (AuthID) for
          identity verification services.
        </P>
        <Button onClick={onClick}>Submit</Button>
      </Modal>
      <Backdrop display showAnimation={false} />
    </Wrapper>
  );
};

export default AgreeStatment;
