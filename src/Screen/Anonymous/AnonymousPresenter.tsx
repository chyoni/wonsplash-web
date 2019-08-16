import React from "react";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";
import Profile from "src/Components/Profile";

interface IProps {
  anyone: IProfile;
  myLikePhotos: IMyLikes[];
}
const AnonymousPresenter: React.SFC<IProps> = ({ anyone, myLikePhotos }) => {
  return <Profile profile={anyone} myLikes={myLikePhotos} />;
};

export default AnonymousPresenter;
