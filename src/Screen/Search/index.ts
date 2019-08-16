import SearchContainer from "./SearchContainer";
import { connect } from "react-redux";
import { actionCreators as collectActions } from "src/Redux/Modules/collect";

const mapStateToProps = (state, ownProps) => {
  const { history } = ownProps;
  const {
    collect: { feedArray },
    router
  } = state;
  return {
    history,
    router,
    feedArray
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchByTerm: (term: string) => {
      dispatch(collectActions.searchByTerm(term));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
