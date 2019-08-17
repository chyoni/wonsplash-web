import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Popup from "reactjs-popup";
import { IProfile, IMyLikes } from "src/Redux/Modules/user";
import Theme from "src/Styles/Theme";
import Avatar from "../Avatar";
import Button from "../Button";
import Photo from "../Photo";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  max-width: ${Theme.photoMaxWidth};
  margin-top: 50px;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ExAvatar = styled(Avatar)`
  width: 160px;
  height: 160px;
  margin-right: 50px;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
`;
const Column = styled.div`
  display: flex;
`;
const Username = styled.span`
  font-size: 40px;
  font-weight: 600;
  margin-right: 15px;
  color: ${Theme.blackFontColor};
`;
const MoreButton = styled.div`
  padding: 8px;
  border: ${Theme.boxBorder};
  border-radius: 6px;
  background-color: ${Theme.whiteFontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MoreBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const MoreColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  color: ${Theme.blackFontColor};
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.redColor};
  }
`;
const FollowButton = styled(Button)`
  border: ${props => (props.text === "Following" ? Theme.boxBorder : null)};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  }
`;
const Text = styled.span`
  font-size: 17px;
  margin-top: 20px;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;
const SectionPhoto = styled<any>("span")`
  font-size: 19px;
  transition: color 0.2s linear;
  color: ${props =>
    props.state === "photo" ? Theme.blackFontColor : Theme.greyFontColor};
  font-weight: 500;
  margin-right: 45px;
  cursor: pointer;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const SectionLiked = styled<any>("span")`
  font-size: 19px;
  transition: color 0.2s linear;
  color: ${props =>
    props.state === "liked" ? Theme.blackFontColor : Theme.greyFontColor};
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${Theme.blackFontColor};
  }
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
  profile: IProfile;
  myLikes: IMyLikes[];
  state?: string;
  stateToPhoto: () => void;
  stateToLiked: () => void;
  onClickFollowButton: () => void;
  logout: () => void;
}
const ProfilePresenter: React.SFC<IProps> = ({
  profile,
  myLikes,
  state,
  stateToPhoto,
  stateToLiked,
  onClickFollowButton,
  logout
}) => {
  return (
    <>
      <Container>
        <Helmet>
          <title>{`${profile.username} | Wonsplash`}</title>
        </Helmet>
        <Header>
          <ExAvatar uri={profile.avatar} />
          <HeaderRight>
            <Column>
              <Username>{profile.username}</Username>
              {profile.is_self ? (
                <Popup
                  trigger={<MoreButton>Menu</MoreButton>}
                  position={"bottom center"}
                  closeOnDocumentClick={true}
                >
                  <MoreBox>
                    <Link to={`/edit`}>
                      <MoreColumn>Edit Account</MoreColumn>
                    </Link>
                    <Link to={"/post"}>
                      <MoreColumn>Submit a photo</MoreColumn>
                    </Link>
                    <MoreColumn onClick={logout}>Logout</MoreColumn>
                  </MoreBox>
                </Popup>
              ) : (
                <FollowButton
                  bgColor={
                    profile.is_following
                      ? Theme.whiteFontColor
                      : Theme.blueFollowColor
                  }
                  text={profile.is_following ? "Following" : "Follow"}
                  textColor={
                    profile.is_following
                      ? Theme.blackFontColor
                      : Theme.whiteFontColor
                  }
                  textSize={"16px"}
                  onClick={onClickFollowButton}
                  width={"80px"}
                />
              )}
            </Column>
            <Column>
              <Text>
                {`Download free, beautiful high-quality photos curated by ${
                  profile.username
                }.`}
              </Text>
            </Column>
          </HeaderRight>
        </Header>
        <Section>
          <SectionPhoto state={state} onClick={stateToPhoto}>{`${
            profile.post_count
          } Photos`}</SectionPhoto>
          {profile.is_self && (
            <SectionLiked state={state} onClick={stateToLiked}>{`${
              myLikes.length
            } Liked`}</SectionLiked>
          )}
        </Section>
      </Container>
      {profile.is_self ? (
        <>
          {state === "photo" ? (
            <>
              {profile.images.length > 0 ? (
                <GridPhotoContainer>
                  {profile.images.map(p => (
                    <Photo
                      key={p.id}
                      id={p.id}
                      file={p.file}
                      isLiked={p.is_liked}
                      likeCount={p.like_count}
                      createdAt={p.natural_time}
                      tags={p.tags}
                      views={p.views}
                      creator={p.creator}
                      showingHeart={false}
                    />
                  ))}
                </GridPhotoContainer>
              ) : (
                <NoPhoto>
                  <AlternativePhoto
                    src={require("../../images/noSearch.png")}
                  />
                </NoPhoto>
              )}
            </>
          ) : (
            <>
              {myLikes.length > 0 ? (
                <GridPhotoContainer>
                  {myLikes.map(liked => (
                    <Photo
                      key={liked.id}
                      id={liked.image.id}
                      file={liked.image.file}
                      isLiked={liked.image.is_liked}
                      likeCount={liked.image.like_count}
                      createdAt={liked.image.natural_time}
                      tags={liked.image.tags}
                      views={liked.image.views}
                      creator={liked.image.creator}
                      showingHeart={false}
                    />
                  ))}
                </GridPhotoContainer>
              ) : (
                <NoPhoto>
                  <AlternativePhoto
                    src={require("../../images/noSearch.png")}
                  />
                </NoPhoto>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {profile.images.length > 0 ? (
            <GridPhotoContainer>
              {profile.images.map(p => (
                <Photo
                  key={p.id}
                  id={p.id}
                  file={p.file}
                  isLiked={p.is_liked}
                  likeCount={p.like_count}
                  createdAt={p.natural_time}
                  tags={p.tags}
                  views={p.views}
                  creator={p.creator}
                  showingHeart={false}
                />
              ))}
            </GridPhotoContainer>
          ) : (
            <NoPhoto>
              <AlternativePhoto src={require("../../images/noSearch.png")} />
            </NoPhoto>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePresenter;
