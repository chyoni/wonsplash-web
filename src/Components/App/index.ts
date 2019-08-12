import AppContainer from "./AppContainer";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    router: { location }
  } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    pathname: location.pathname
  };
};

export default connect(mapStateToProps)(AppContainer);
