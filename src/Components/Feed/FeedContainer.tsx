import React from "react";
import FeedPresenter from "./FeedPresenter";

interface IState {
  term: string;
  loading: boolean;
}
interface IProps {
  feed: () => void;
  feedArray: any;
}
class FeedContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      loading: true
    };
  }

  public onChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  };

  public componentDidMount() {
    const { feed } = this.props;
    feed();
  }

  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.feedArray) {
      this.setState({ loading: false });
    }
  }

  public render() {
    const { term, loading } = this.state;
    if (loading) {
      return null;
    } else {
      return <FeedPresenter term={term} onChange={this.onChange} />;
    }
  }
}

export default FeedContainer;
