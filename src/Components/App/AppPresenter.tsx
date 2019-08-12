import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../Auth";
import Feed from "../Feed";

interface IProps {
  isLoggedIn: boolean;
  pathname: string;
}
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn, pathname }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Feed} />
    </Switch>
  );
};

const LoggedOutRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path={"/"} component={Auth} />
    </Switch>
  );
};
export default AppPresenter;
