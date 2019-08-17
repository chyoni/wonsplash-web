import FollowingsContainer from "./FollowingsContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "src/Redux/Modules/collect";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username },
    collect: { feedArray }
  } = state;
  return {
    username,
    feedArray
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    followingsImage: (username: string) => {
      dispatch(collectActions.followingsImage(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowingsContainer);
