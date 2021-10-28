import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AgreeStatment from "./components/AgreeStatement/";
import Register from "./pages/Register/";
import Login from "./pages/Login/";
import Home from "./pages/Home/";
import Private from "./components/Private/";
import Theme from "./theme/";

const App = function () {
  const [username, setUsername] = useState("");
  const [agreementDisplay, setAgreementDisplay] = useState(true);

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleAgreement = () => {
    setAgreementDisplay(false);
  };

  return (
    <Theme>
      <Router>
        {agreementDisplay && <AgreeStatment onClick={handleAgreement} />}
        <Switch>
          <Route path="/" exact>
            <Login username={username} handleUsername={handleUsername} />
          </Route>
          <Route path="/register" exact>
            <Register username={username} handleUsername={handleUsername} />
          </Route>
          <Route path="/login" exact>
            <Login username={username} handleUsername={handleUsername} />
          </Route>
          <Private path="/home">
            <Home username={username} />
          </Private>
        </Switch>
      </Router>
    </Theme>
  );
};

export default App;
