import React from "react";
import isNil from "lodash/fp/isNil";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import { Close, Heart, Info, Eye, Hashtag, Delete } from "../Icons/icons";
import Loader from "../Loader";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  background-color: ${Theme.whiteFontColor};
  border: ${Theme.boxBorder};
  border-radius: 7px;
  cursor: default;
`;
const ModalHeader = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;
const ModalHeaderUser = styled.div`
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
`;
const ModalHeaderMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CloseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ExAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;
const HeartBox = styled<any>("div")`
  display: flex;
  align-items: center;
  padding: 10px 11px;
  justify-content: center;
  border-radius: 7px;
  transition: all 0.2s linear;
  background-color: ${props =>
    props.isLiked ? Theme.redColor : Theme.whiteFontColor};
  margin-right: 25px;
  border: ${Theme.boxBorder};
  cursor: pointer;
  &:hover {
    border-color: ${Theme.blackFontColor};
  }
  svg {
    transition: fill 0.2s ease;
    fill: ${props => (props.isLiked ? Theme.whiteFontColor : Theme.redColor)};
  }
`;
const DeleteBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.whiteFontColor};
  border: ${Theme.boxBorder};
  transition: all 0.2s linear;
  border-radius: 7px;
  padding: 10px 11px;
  margin-right: 25px;
  cursor: pointer;
  &:hover {
    border-color: ${Theme.blackFontColor};
  }
`;
const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const ModalBodyPhoto = styled<any>("div")`
  background-image: url(${props => props.file});
  position: relative;
  left: 0;
  top: 0;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const ModalFooter = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  color: ${Theme.blackFontColor};
`;
const Publish = styled.span`
  font-size: 14px;
  color: ${Theme.blackFontColor};
  margin-bottom: 8px;
`;
const SubTitle = styled.span`
  font-size: 13px;
  margin-left: 6px;
`;
const Tags = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
  margin-left: 5px;
`;

interface IProps {
  toggleModal: () => void;
  detailPhoto: () => void;
  likePhoto: () => void;
  unlikePhoto: () => void;
  deletePhoto: () => void;
  photoId: number;
  username: string;
  photo: {
    creator: { id: number; username: string; avatar: string };
    file: string;
    id: number;
    is_liked: boolean;
    like_count: number;
    natural_time: string;
    tags: any;
    views: number;
  };
}
interface IState {
  loading: boolean;
}
class PhotoModalContainer extends React.Component<IProps, IState> {
  public modal: any;
  public info: any;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.modal = React.createRef();
  }

  public componentDidMount() {
    const { detailPhoto } = this.props;
    document.addEventListener("click", this.handleOutsideClick, false);
    detailPhoto();
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  public UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps && nextProps.photo && nextProps.photo.id) {
      this.setState({ loading: false });
    }
  }

  public handleOutsideClick = e => {
    const { toggleModal } = this.props;
    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        toggleModal();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  };

  public onClickHeart = () => {
    const {
      photo: { is_liked },
      likePhoto,
      unlikePhoto
    } = this.props;
    if (is_liked) {
      unlikePhoto();
    } else {
      likePhoto();
    }
  };

  public onClickDelete = () => {
    const { toggleModal, deletePhoto } = this.props;
    setTimeout(() => {
      toggleModal();
    }, 500);
    deletePhoto();
  };

  public render() {
    const { toggleModal } = this.props;
    const { loading } = this.state;
    if (loading) {
      return (
        <ModalOverlay>
          <ModalContainer ref={node => (this.modal = node)}>
            <Loader />
          </ModalContainer>
        </ModalOverlay>
      );
    } else {
      const { photo, username: stateUsername } = this.props;
      return (
        <ModalOverlay>
          <ModalContainer ref={node => (this.modal = node)}>
            <ModalHeader>
              <ModalHeaderUser>
                <Link to={`/profile/${photo.creator.username}`}>
                  <ExAvatar uri={photo.creator.avatar} />
                </Link>
                <Link to={`/profile/${photo.creator.username}`}>
                  <Username>{photo.creator.username}</Username>
                </Link>
              </ModalHeaderUser>
              <ModalHeaderMeta>
                {photo.creator.username === stateUsername && (
                  <DeleteBox
                    title={"Delete Photo"}
                    onClick={this.onClickDelete}
                  >
                    <Delete />
                  </DeleteBox>
                )}
                <HeartBox
                  isLiked={photo.is_liked}
                  onClick={this.onClickHeart}
                  title={"Like Photo"}
                >
                  <Heart />
                </HeartBox>
                <CloseBox onClick={toggleModal}>
                  <Close />
                </CloseBox>
              </ModalHeaderMeta>
            </ModalHeader>
            <ModalBody>
              <ModalBodyPhoto file={photo.file} />
            </ModalBody>
            <ModalFooter>
              <Column>
                <Info />
                <Title>INFO</Title>
              </Column>
              <Publish>{`Published on ${photo.natural_time}`}</Publish>
              <Column>
                <Eye />
                <SubTitle>Views</SubTitle>
                <Title>{photo.views}</Title>
              </Column>
              <Column>
                <Hashtag />
                <SubTitle>HashTags</SubTitle>
                {photo.tags.map((tag, index) => (
                  <Tags key={index}>{tag}</Tags>
                ))}
              </Column>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      );
    }
  }
}

export default PhotoModalContainer;
