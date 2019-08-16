import React from "react";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";
import Profile from "src/Components/Profile";

interface IProps {
  me: IProfile;
  myLikePhotos: IMyLikes[];
}
const MyPresenter: React.SFC<IProps> = ({ me, myLikePhotos }) => {
  return <Profile profile={me} myLikes={myLikePhotos} />;
};

export default MyPresenter;
