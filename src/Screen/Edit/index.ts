import EditContainer from "./EditContainer";
import { connect } from "react-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { me, username }
  } = state;
  return {
    me,
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    profile: (username: string) => {
      dispatch(userActions.profile(username));
    },
    edit: (firstName?: string, lastName?: string, avatar?: string) => {
      dispatch(userActions.edit(firstName, lastName, avatar));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContainer);
