import { useHistory } from "react-router-dom";
import BaseView from "../../components/BaseView/";
import Title from "../../components/Title/";
import happyFaceUrl from "../../images/happy-face.svg";
import Button from "../../components/Button/";
import User from "../../services/user";
import { Wrapper, Img } from "./style";

interface Props {
  username: string;
}

const Home = ({ username }: Props) => {
  const history = useHistory();

  const handleLogOut = async () => {
    await User.logout();
    history.push("/login");
  };

  return (
    <BaseView>
      <Wrapper>
        <Title large>Welcome {username}!</Title>
        <Img src={happyFaceUrl} />
        <Button onClick={handleLogOut}>Log Out</Button>
      </Wrapper>
    </BaseView>
  );
};

export default Home;
