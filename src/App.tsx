import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register/";
import Login from "./pages/Login/";
import Theme from "./theme/";

const App = function () {
  return (
    <Theme>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Register />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </Theme>
  );
};

export default App;
