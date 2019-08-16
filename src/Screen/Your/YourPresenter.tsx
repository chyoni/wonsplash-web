import React from "react";
import { IProfile } from "src/Redux/Modules/user";
import Profile from "src/Components/Profile";

interface IProps {
  anyone: IProfile;
}
const YourPresenter: React.SFC<IProps> = ({ anyone }) => {
  return <Profile profile={anyone} />;
};

export default YourPresenter;
