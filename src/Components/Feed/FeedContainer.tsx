import React from "react";
import FeedPresenter from "./FeedPresenter";

interface IState {
  term: string;
}
class FeedContainer extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
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

  public render() {
    const { term } = this.state;
    return <FeedPresenter term={term} onChange={this.onChange} />;
  }
}

export default FeedContainer;
