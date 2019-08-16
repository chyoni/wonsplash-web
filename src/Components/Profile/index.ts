import ProfileContainer from "./ProfileContainer";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  const { router } = state;
  return {
    router
  };
};
export default connect(mapStateToProps)(ProfileContainer);
