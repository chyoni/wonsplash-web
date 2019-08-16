import EditContainer from "./EditContainer";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { me }
  } = state;
  return {
    me
  };
};

export default connect(mapStateToProps)(EditContainer);
