import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
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

interface IProps {
  file: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: string;
  tags: any;
  views: number;
  creator: { id: string; avatar: string; username: string };
}
const Photo: React.SFC<IProps> = ({
  file,
  isLiked,
  likeCount,
  createdAt,
  tags,
  views,
  creator
}) => {
  return (
    <Container file={file}>
      <Overlay>Hey!</Overlay>
    </Container>
  );
};

export default Photo;
