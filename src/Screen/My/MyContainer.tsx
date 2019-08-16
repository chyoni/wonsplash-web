import React from "react";
import MyPresenter from "./MyPresenter";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";
import Loader from "src/Components/Loader";

interface IProps {
  username: string;
  me: IProfile;
  myLikePhotos: IMyLikes[];
  myProfile: (username: string) => void;
  myLikes: () => void;
}
interface IState {
  loading: boolean;
}
class MyContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const { myProfile, username, myLikes } = this.props;
    myProfile(username);
    myLikes();
  }
  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.me && nextProps.myLikePhotos) {
      this.setState({
        loading: false
      });
    }
  }
  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { me, myLikePhotos } = this.props;
      return <MyPresenter me={me} myLikePhotos={myLikePhotos} />;
    }
  }
}

export default MyContainer;
