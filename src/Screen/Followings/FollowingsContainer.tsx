import React from "react";
import { IDetailPhoto } from "src/Redux/Modules/collect";
import Loader from "src/Components/Loader";
import FollowingsPresenter from "./FollowingsPresenter";

interface IProps {
  username: string;
  feedArray: IDetailPhoto[];
  followingsImage: (username: string) => void;
}
interface IState {
  loading: boolean;
}
class FollowingsContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const { followingsImage, username } = this.props;
    followingsImage(username);
  }

  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.feedArray) {
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
      const { feedArray } = this.props;
      return <FollowingsPresenter collects={feedArray} />;
    }
  }
}

export default FollowingsContainer;
