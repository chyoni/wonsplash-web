import React from "react";
import HeaderPresenter from "./HeaderPresenter";

interface IProps {
  username: string;
  who: object;
  location: any;
  profile: (username: any) => void;
  goSearch: (term: string) => void;
}
interface IState {
  term: string;
  loading: boolean;
}
class HeaderContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      loading: true
    };
  }

  public componentDidMount() {
    const { profile, username } = this.props;
    profile(username);
  }

  // will deprecated funtion at v17~
  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.who) {
      this.setState({ loading: false });
    }
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
    const { term } = this.state;
    const { goSearch } = this.props;
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch(term);
    }
  };

  public render() {
    const { location } = this.props;
    const { term, loading } = this.state;
    if (loading) {
      return null;
    } else {
      const { who } = this.props;
      return (
        <HeaderPresenter
          term={term}
          onChange={this.onChange}
          handleKeyPress={this.handleKeyPress}
          who={who}
          location={location}
        />
      );
    }
  }
}

export default HeaderContainer;
