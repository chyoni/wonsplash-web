import React from "react";
import ProfilePresenter from "./ProfilePresenter";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";

interface IProps {
  profile: IProfile;
  myLikes: IMyLikes[];
  router: any;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  logout: () => void;
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
  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    const { router } = this.props;
    if (nextProps.router.location.key !== router.location.key) {
      window.location.reload();
    }
  }

  public onClickFollowButton = () => {
    const { profile, follow, unfollow } = this.props;
    if (profile.is_following) {
      unfollow(profile.id);
    } else {
      follow(profile.id);
    }
  };

  public render() {
    const { profile, myLikes, logout } = this.props;
    const { state } = this.state;
    return (
      <ProfilePresenter
        profile={profile}
        myLikes={myLikes}
        state={state}
        stateToPhoto={this.stateToPhoto}
        stateToLiked={this.stateToLiked}
        onClickFollowButton={this.onClickFollowButton}
        logout={logout}
      />
    );
  }
}

export default ProfileContainer;
