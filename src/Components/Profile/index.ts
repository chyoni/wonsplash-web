import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const { router } = state;
  return {
    router
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    follow: (userId: number) => {
      dispatch(userActions.follow(userId));
    },
    unfollow: (userId: number) => {
      dispatch(userActions.unfollow(userId));
    },
    logout: () => {
      dispatch(userActions.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
