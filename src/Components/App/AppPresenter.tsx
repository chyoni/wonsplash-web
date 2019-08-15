import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../Screen/Login";
import Join from "../../Screen/Join";
import Feed from "../../Screen/Feed";
import Header from "../Header";
import Search from "src/Screen/Search";

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
      <Route exact={true} path={"/search"} component={Search} />
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
