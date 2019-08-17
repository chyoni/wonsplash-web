import PhotoModal from "./PhotoModal";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "src/Redux/Modules/collect";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username },
    collect: { photo }
  } = state;
  return {
    photo,
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { photoId } = ownProps;
  return {
    detailPhoto: () => {
      dispatch(collectActions.detailPhoto(photoId));
    },
    likePhoto: () => {
      dispatch(collectActions.likePhoto(photoId));
    },
    unlikePhoto: () => {
      dispatch(collectActions.unlikePhoto(photoId));
    },
    deletePhoto: () => {
      dispatch(collectActions.deletePhoto(photoId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoModal);
