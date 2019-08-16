import React from "react";
import AnonymousPresenter from "./AnonymousPresenter";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";
import Loader from "src/Components/Loader";

interface IProps {
  anyone: IProfile;
  anyoneProfile: () => void;
  myLikePhotos: IMyLikes[];
  myLikes: () => void;
}
interface IState {
  loading: boolean;
}
class AnonymousContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const { anyoneProfile, myLikes } = this.props;
    anyoneProfile();
    myLikes();
  }

  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.anyone && nextProps.myLikePhotos) {
      this.setState({
        loading: false
      });
    }
  }

  public render() {
    const { loading } = this.state;
    const { anyone, myLikePhotos } = this.props;
    if (loading) {
      return <Loader />;
    } else {
      return <AnonymousPresenter anyone={anyone} myLikePhotos={myLikePhotos} />;
    }
  }
}

export default AnonymousContainer;
