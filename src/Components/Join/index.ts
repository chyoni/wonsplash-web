import JoinContainer from "./JoinContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const { router } = state;
  const { history } = ownProps;
  return {
    router,
    history
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: (accessToken: string) => {
      dispatch(userActions.facebookLogin(accessToken));
    },
    registration: (
      username: string,
      password1: string,
      password2: string,
      email: string
    ) => {
      dispatch(userActions.registration(username, password1, password2, email));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinContainer);
