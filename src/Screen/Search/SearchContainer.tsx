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
  searchByTerm: (term: string) => void;
  searchPhotos: IDetailPhoto[];
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
    if (nextProps && nextProps.searchPhotos) {
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
      const { searchPhotos } = this.props;
      const {
        history: {
          location: { search }
        }
      } = this.props;
      const [, term] = search.split("=");
      return (
        <SearchPresenter searchPhotos={searchPhotos} term={decodeURI(term)} />
      );
    }
  }
}

export default SearchContainer;
