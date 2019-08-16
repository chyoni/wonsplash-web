import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";

interface IProps {
  profile: IProfile;
  myLikes?: IMyLikes[] | null;
}
interface IState {
  state: string;
}
class ProfileContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      state: "photo"
    };
  }

  public stateToPhoto = () => {
    this.setState({
      state: "photo"
    });
  };
  public stateToLiked = () => {
    this.setState({
      state: "liked"
    });
  };

  public render() {
    const { profile, myLikes } = this.props;
    const { state } = this.state;
    if (myLikes) {
      return (
        <ProfilePresenter
          profile={profile}
          myLikes={myLikes}
          state={state}
          stateToPhoto={this.stateToPhoto}
          stateToLiked={this.stateToLiked}
        />
      );
    } else {
      return (
        <ProfilePresenter
          profile={profile}
          state={state}
          stateToPhoto={this.stateToPhoto}
          stateToLiked={this.stateToLiked}
        />
      );
    }
  }
}

export default ProfileContainer;
