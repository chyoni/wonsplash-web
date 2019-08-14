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

class PhotoContainer extends React.Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

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
    return (
      <PhotoPresenter
        id={id}
        file={file}
        isLiked={isLiked}
        creator={creator}
        onClickHeart={this.onClickHeart}
      />
    );
  }
}

export default PhotoContainer;
