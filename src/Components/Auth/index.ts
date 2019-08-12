import AuthContainer from "./AuthContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "../../Redux/Modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: accessToken => {
      dispatch(userActions.facebookLogin(accessToken));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AuthContainer);
