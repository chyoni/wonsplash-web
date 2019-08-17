import React from "react";
import styled from "styled-components";
import { IDetailPhoto } from "src/Redux/Modules/collect";
import Theme from "src/Styles/Theme";
import Photo from "src/Components/Photo";

const HeaderContainer = styled.div`
  max-width: ${Theme.photoMaxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Term = styled.span`
  font-size: 46px;
  font-weight: 600;
  color: ${Theme.blackFontColor};
  margin-bottom: 30px;
`;
const Count = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${Theme.blackFontColor};
`;
const GridPhotoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(400px, auto);
  margin: 60px auto;
  min-height: 500px;
  max-width: ${Theme.photoMaxWidth};
`;
const NoPhoto = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const AlternativePhoto = styled.img`
  width: 300px;
  height: 300px;
`;
interface IProps {
  collects: IDetailPhoto[];
}
const FollowingsPresenter: React.SFC<IProps> = ({ collects }) => {
  return (
    <>
      <HeaderContainer>
        <Header>
          <Term>My Followings</Term>
          <Count>{`${collects.length} Photos`}</Count>
        </Header>
      </HeaderContainer>
      {collects.length > 0 ? (
        <GridPhotoContainer>
          {collects.map(c => (
            <Photo
              key={c.id}
              id={c.id}
              file={c.file}
              isLiked={c.is_liked}
              likeCount={c.like_count}
              createdAt={c.natural_time}
              tags={c.tags}
              views={c.views}
              creator={c.creator}
            />
          ))}
        </GridPhotoContainer>
      ) : (
        <NoPhoto>
          <AlternativePhoto src={require("../../images/noSearch.png")} />
        </NoPhoto>
      )}
    </>
  );
};

export default FollowingsPresenter;
