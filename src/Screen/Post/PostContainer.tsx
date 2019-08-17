import React from "react";
import PostPresenter from "./PostPresenter";
import { API_KEY } from "src/secret";
import axios from "axios";
import { toast } from "react-toastify";

interface IProps {
  postPhoto: (file, tags) => void;
}
interface IState {
  uploading: boolean;
  fileUrl: string | null;
  tags: any;
}
class PostContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      fileUrl: null,
      tags: ""
    };
  }

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
          uploading: false
        });
      }
    }
  };

  public onChangeText = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit = async () => {
    const { fileUrl, tags } = this.state;
    const { postPhoto } = this.props;
    if (fileUrl && tags !== "") {
      const tagsToArray = await tags.split(",");
      const toJson = await JSON.stringify(tagsToArray);
      postPhoto(fileUrl, toJson);
    } else {
      toast.error("모든 항목은 필수사항 입니다");
      return;
    }
  };

  public render() {
    const { uploading, fileUrl, tags } = this.state;
    return (
      <PostPresenter
        uploading={uploading}
        fileUrl={fileUrl}
        onChange={this.onChange}
        onChangeText={this.onChangeText}
        tags={tags}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default PostContainer;
