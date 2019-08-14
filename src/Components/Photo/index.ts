import PhotoContainer from "./PhotoContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "src/Redux/Modules/collect";

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;
  return {
    likePhoto: () => {
      dispatch(collectActions.likePhoto(id));
    },
    unlikePhoto: () => {
      dispatch(collectActions.unlikePhoto(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PhotoContainer);
