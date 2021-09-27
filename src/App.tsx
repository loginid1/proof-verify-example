import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login, { Flows } from "./pages/Login/";
import Theme from "./theme/";

const App = function () {
  return (
    <Theme>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login type={Flows.LOGIN} />
          </Route>
          <Route path="/register" exact>
            <Login type={Flows.REGISTER} />
          </Route>
        </Switch>
      </Router>
    </Theme>
  );
};

export default App;
