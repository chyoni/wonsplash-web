import AnonymousContainer from "./AnonymousContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { anyone, myLikePhotos }
  } = state;
  return {
    anyone,
    myLikePhotos
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { username }
    }
  } = ownProps;
  return {
    anyoneProfile: () => {
      dispatch(userActions.anyoneProfile(username));
    },
    myLikes: () => {
      dispatch(userActions.myLikes());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousContainer);
