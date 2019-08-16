import React from "react";
import YourPresenter from "./YourPresenter";
import { IProfile } from "src/Redux/Modules/user";
import Loader from "src/Components/Loader";

interface IProps {
  anyone: IProfile;
  anyoneProfile: () => void;
}
interface IState {
  loading: boolean;
}
class YourContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  public componentDidMount() {
    const { anyoneProfile } = this.props;
    anyoneProfile();
  }

  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.anyone) {
      this.setState({
        loading: false
      });
    }
  }

  public render() {
    const { loading } = this.state;
    const { anyone } = this.props;
    if (loading) {
      return <Loader />;
    } else {
      return <YourPresenter anyone={anyone} />;
    }
  }
}

export default YourContainer;
