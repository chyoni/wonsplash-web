import HeaderContainer from "./HeaderContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username, my },
    router: { location }
  } = state;
  return {
    username,
    my,
    pathname: location.pathname
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    profile: username => {
      dispatch(userActions.profile(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
