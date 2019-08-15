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
interface IProps {
  searchPhotos: IDetailPhoto[];
  term: string;
}
const SearchPresenter: React.SFC<IProps> = ({ searchPhotos, term }) => {
  return (
    <>
      <HeaderContainer>
        <Header>
          <Term>{term}</Term>
          <Count>{`${searchPhotos.length} Photos`}</Count>
        </Header>
      </HeaderContainer>
      <GridPhotoContainer>
        {searchPhotos.map(photo => (
          <Photo
            key={photo.id}
            id={photo.id}
            file={photo.file}
            isLiked={photo.is_liked}
            likeCount={photo.like_count}
            createdAt={photo.natural_time}
            tags={photo.tags}
            views={photo.views}
            creator={photo.creator}
          />
        ))}
      </GridPhotoContainer>
    </>
  );
};

export default SearchPresenter;
