import HeaderContainer from "./HeaderContainer";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { actionCreators as userActions } from "src/Redux/Modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username, my },
    router: { location }
  } = state;
  return {
    username,
    my,
    location
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    profile: (username: string) => {
      dispatch(userActions.profile(username));
    },
    goSearch: (term: string) => {
      dispatch(push(`/search?term=${term}`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
