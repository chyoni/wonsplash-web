import React from "react";
import FeedPresenter from "./FeedPresenter";
import Loader from "../../Components/Loader";

interface IState {
  term: string;
  loading: boolean;
}
interface IProps {
  feed: () => void;
  feedArray: any;
  router: any;
  history: any;
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

  public handleKeyPress = e => {
    const { history } = this.props;
    const { term } = this.state;
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(`/search?term=${term}`);
    }
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
      return <Loader />;
    } else {
      const { feedArray } = this.props;
      return (
        <FeedPresenter
          term={term}
          onKeyPress={this.handleKeyPress}
          onChange={this.onChange}
          feedArray={feedArray}
        />
      );
    }
  }
}

export default FeedContainer;
