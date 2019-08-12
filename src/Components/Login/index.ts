import LoginContainer from "./LoginContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../Redux/Modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: (accessToken: string) => {
      dispatch(userActions.facebookLogin(accessToken));
    },
    usernameLogin: (username: string, password: string) => {
      dispatch(userActions.usernameLogin(username, password));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
