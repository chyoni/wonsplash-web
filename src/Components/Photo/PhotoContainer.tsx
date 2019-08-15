import React from "react";
import PhotoPresenter from "./PhotoPresenter";

interface IProps {
  id: number;
  file: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tags: any;
  views: number;
  ownProps: any;
  creator: {
    id: string;
    avatar: string;
    username: string;
  };
  likePhoto: () => void;
  unlikePhoto: () => void;
}

interface IState {
  isOpen: boolean;
}
class PhotoContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  public toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  public onClickHeart = () => {
    const { isLiked, likePhoto, unlikePhoto } = this.props;
    if (isLiked) {
      unlikePhoto();
    } else {
      likePhoto();
    }
  };

  public render() {
    const { id, file, isLiked, creator } = this.props;
    const { isOpen } = this.state;
    return (
      <PhotoPresenter
        id={id}
        file={file}
        isLiked={isLiked}
        creator={creator}
        onClickHeart={this.onClickHeart}
        isOpen={isOpen}
        toggleModal={this.toggleModal}
      />
    );
  }
}

export default PhotoContainer;
