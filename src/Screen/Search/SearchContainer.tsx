import React from "react";
import SearchPresenter from "./SearchPresenter";
import { IDetailPhoto } from "src/Redux/Modules/collect";
import { History } from "history";
import Loader from "src/Components/Loader";

interface IState {
  loading: boolean;
}
interface IProps {
  history: History;
  router: any;
  searchByTerm: (term: string) => void;
  feedArray: IDetailPhoto[];
}
class SearchContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  public componentDidMount() {
    const {
      history: {
        location: { search }
      },
      searchByTerm
    } = this.props;
    const [, term] = search.split("=");
    const decodeTerm = decodeURI(term);
    searchByTerm(decodeTerm);
  }
  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    const { router, searchByTerm } = this.props;
    if (nextProps && nextProps.feedArray) {
      this.setState({
        loading: false
      });
    }
    if (nextProps.location.key !== router.location.key) {
      const {
        location: { search }
      } = nextProps;
      const [, term] = search.split("=");
      const decodeTerm = decodeURI(term);
      searchByTerm(decodeTerm);
    }
  }

  public render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { feedArray } = this.props;
      const {
        history: {
          location: { search }
        }
      } = this.props;
      const [, term] = search.split("=");
      return <SearchPresenter feedArray={feedArray} term={decodeURI(term)} />;
    }
  }
}

export default SearchContainer;
