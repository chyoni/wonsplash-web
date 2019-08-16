import YourContainer from "./YourContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { anyone }
  } = state;
  return {
    anyone
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourContainer);
