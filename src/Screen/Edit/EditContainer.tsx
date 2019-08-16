import React from "react";
import EditPresenter from "./EditPresenter";
import { IProfile } from "src/Redux/Modules/user";
import Loader from "src/Components/Loader";

interface IProps {
  me: IProfile;
}
interface IState {
  loading: boolean;
  uploading: boolean;
  fileUrl: string | null;
  firstName: string;
  lastName: string;
}
class EditContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uploading: false,
      fileUrl: null,
      firstName: "",
      lastName: ""
    };
  }

  public async componentDidMount() {
    const { me } = this.props;
    if (me.avatar !== null && me.avatar !== "") {
      await this.setState({
        fileUrl: me.avatar
      });
    }
    if (me.first_name && me.last_name) {
      await this.setState({
        firstName: me.first_name,
        lastName: me.last_name
      });
    }
    this.setState({
      loading: false
    });
  }

  //   public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
  //     if (nextProps && nextProps.me) {
  //       this.setState({
  //         loading: false
  //       });
  //     }
  //   }

  public onChangeText = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  };

  public render() {
    const { loading, fileUrl, uploading, firstName, lastName } = this.state;
    const { me } = this.props;
    if (loading) {
      return <Loader />;
    } else {
      return (
        <EditPresenter
          fileUrl={fileUrl}
          uploading={uploading}
          firstName={firstName}
          lastName={lastName}
          me={me}
          onChangeText={this.onChangeText}
        />
      );
    }
  }
}

export default EditContainer;
