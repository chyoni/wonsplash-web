import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Login";
import Join from "../Join";
import Feed from "../Feed";
import Header from "../Header";

interface IProps {
  isLoggedIn: boolean;
  pathname: string;
}
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn, pathname }) => {
  return (
    <>
      {isLoggedIn ? <Header /> : null}
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </>
  );
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
      <Route exact={true} path={"/"} component={Login} />
      <Route exact={true} path={"/join"} component={Join} />
    </Switch>
  );
};
export default AppPresenter;
