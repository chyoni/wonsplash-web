import React from "react";
import styled from "styled-components";
import { Heart, View } from "../Icons/icons";
import Theme from "src/Styles/Theme";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 13px;
  justify-content: flex-end;
`;
const Bottom = styled.div`
  margin-top: 100%;
  display: flex;
  align-items: center;
  padding: 13px;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
`;
const HeartBox = styled<any>("div")`
  display: flex;
  align-items: center;
  padding: 16px 14px;
  justify-content: center;
  border-radius: 7px;
  background-color: ${props =>
    props.isLiked ? Theme.redColor : Theme.whiteFontColor};
  margin-right: 10px;
  svg {
    fill: ${props => (props.isLiked ? Theme.whiteFontColor : Theme.redColor)};
  }
`;
const ViewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 7px;
  padding: 7px 10px;
`;
const Container = styled<any>("div")`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.file});
  background-position: center;
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;
const ExAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  border-radius: 17px;
  margin-right: 10px;
`;
const Username = styled.span`
  font-size: 15px;
  color: ${Theme.lightGreyColor};
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.whiteFontColor};
  }
`;

interface IProps {
  id: number;
  file: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tags: any;
  views: number;
  creator: {
    id: string;
    avatar: string;
    username: string;
  };
}
const Photo: React.SFC<IProps> = ({
  id,
  file,
  isLiked,
  likeCount,
  createdAt,
  tags,
  views,
  creator
}) => {
  const onClick = () => {
    console.log("heart");
  };
  return (
    <Container file={file}>
      <Overlay>
        <Top>
          <HeartBox onClick={onClick} isLiked={isLiked}>
            <Heart />
          </HeartBox>
          <Link to={`/photo/${id}`}>
            <ViewBox>
              <View />
            </ViewBox>
          </Link>
        </Top>
        <Bottom>
          <Link to={`/profile/${creator.username}`}>
            <ExAvatar uri={creator.avatar} />
          </Link>
          <Link to={`/profile/${creator.username}`}>
            <Username>{creator.username}</Username>
          </Link>
        </Bottom>
      </Overlay>
    </Container>
  );
};

export default Photo;