import React from "react";
import EditPresenter from "./EditPresenter";
import { IProfile } from "src/Redux/Modules/user";
import Loader from "src/Components/Loader";
import { API_KEY } from "src/secret";
import axios from "axios";
interface IProps {
  me: IProfile;
  username: string;
  profile: (username: string) => void;
  edit: (
    firstName?: string | undefined,
    lastName?: string | undefined,
    avatar?: string | undefined
  ) => void;
}
interface IState {
  loading: boolean;
  uploading: boolean;
  fileUrl: string | null;
  editAvatar: string | null;
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
      editAvatar: null,
      firstName: "",
      lastName: ""
    };
  }

  public componentDidMount() {
    const { username, profile } = this.props;
    profile(username);
  }

  public async UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.me) {
      if (nextProps.me.avatar !== null && nextProps.me.avatar !== "") {
        await this.setState({
          fileUrl: nextProps.me.avatar
        });
      }
      if (nextProps.me.first_name && nextProps.me.last_name) {
        await this.setState({
          firstName: nextProps.me.first_name,
          lastName: nextProps.me.last_name
        });
      }
      this.setState({
        loading: false
      });
    }
  }

  public onChangeText = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  };

  public onChange = async e => {
    const {
      target: { files }
    } = e;
    if (files) {
      this.setState({ uploading: true });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", API_KEY);
      formData.append("upload_preset", "bojlyeke");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dctekasfv/image/upload",
        formData
      );
      if (secure_url) {
        this.setState({
          fileUrl: secure_url,
          editAvatar: secure_url,
          uploading: false
        });
      }
    }
  };

  public onSumbit = () => {
    const { edit } = this.props;
    const { editAvatar, firstName, lastName } = this.state;
    if (editAvatar === null) {
      edit(firstName, lastName);
    } else {
      edit(firstName, lastName, editAvatar);
    }
  };

  public render() {
    const { loading, fileUrl, uploading, firstName, lastName } = this.state;
    if (loading) {
      return <Loader />;
    } else {
      const { me } = this.props;
      return (
        <EditPresenter
          fileUrl={fileUrl}
          uploading={uploading}
          firstName={firstName}
          lastName={lastName}
          me={me}
          onChangeText={this.onChangeText}
          onChange={this.onChange}
          onSumbit={this.onSumbit}
        />
      );
    }
  }
}

export default EditContainer;
