import PostContainer from "./PostContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "src/Redux/Modules/collect";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postPhoto: (file, tags) => {
      dispatch(collectActions.postPhoto(file, tags));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostContainer);
