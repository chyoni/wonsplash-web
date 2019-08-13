import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import { Link } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import Avatar from "../Avatar";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  align-items: center;
  width: 100%;
  height: ${Theme.headerHight};
  background-color: ${Theme.whiteFontColor};
  border-bottom: 1px solid ${Theme.borderColor};
`;
const HeaderTop = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const HeaderBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  padding: 10px;
`;
const TopFirst = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;
const TopSecond = styled.div`
  flex-grow: 10;
  min-width: 500px;
  margin-right: 15px;
`;
const ExInput = styled(Input)`
  background-color: ${Theme.lightGreyColor};
  border-radius: 60px;
  padding: 5px 20px;
  font-size: 15px;
  transition: border-color 0.2s linear;
  &:focus {
    outline: none;
    background-color: ${Theme.whiteFontColor};
    border-color: ${Theme.borderColor};
  }
  &:hover {
    border-color: ${Theme.blackFontColor};
  }
`;
const ExButton = styled(Button)`
  border: ${Theme.boxBorder};
  padding: 5px 10px;
  transition-property: color border-color;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  &:hover {
    border-color: ${Theme.blackFontColor};
    color: ${Theme.blackFontColor};
  }
`;
const TopThird = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
`;
const ExAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  resize: none;
  border-radius: 25px;
  margin-left: 15px;
`;
const FeedLabel = styled<any>("span")`
  color: ${props =>
    props.pathname === "/" ? Theme.blackFontColor : Theme.greyFontColor};
  font-size: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const FollowingLabel = styled<any>("span")`
  color: ${props =>
    props.pathname === "/following"
      ? Theme.blackFontColor
      : Theme.greyFontColor};
  font-size: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const NatureLabel = styled<any>("span")`
  color: ${props =>
    props.pathname === "/nature" ? Theme.blackFontColor : Theme.greyFontColor};
  font-size: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const FashionLabel = styled<any>("span")`
  color: ${props =>
    props.pathname === "/fashion" ? Theme.blackFontColor : Theme.greyFontColor};
  font-size: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const AnimalLabel = styled<any>("span")`
  color: ${props =>
    props.pathname === "/animal" ? Theme.blackFontColor : Theme.greyFontColor};
  font-size: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${Theme.blackFontColor};
  }
`;
const DivideLine = styled.div`
  border-right: 1px solid ${Theme.borderColor};
  width: 1px;
  height: 100%;
  margin-right: 15px;
`;

interface IProps {
  term: string;
  my: any;
  pathname: string;
  onChange: (e) => void;
}
const HeaderPresenter: React.SFC<IProps> = ({
  term,
  onChange,
  my,
  pathname
}) => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <TopFirst>
          <Link to={"/"}>
            <img
              src={require("../../images/logo.png")}
              style={{ width: 45, height: 45 }}
            />
          </Link>
        </TopFirst>
        <TopSecond>
          <ExInput
            name={"term"}
            value={term}
            onChange={onChange}
            customWidth={"100%"}
            placeholder={"Search free high-resolution photos"}
          />
        </TopSecond>
        <TopThird>
          <ExButton
            width={"120px"}
            textColor={Theme.greyFontColor}
            text={"Submit a photo"}
            textSize={"15px"}
            bgColor={Theme.whiteFontColor}
            onClick={null}
          />
          <Link to={"/profile"}>
            <ExAvatar uri={my.avatar} />
          </Link>
        </TopThird>
      </HeaderTop>
      <HeaderBottom>
        <Link to={"/"}>
          <FeedLabel pathname={pathname}>Feed</FeedLabel>
        </Link>
        <Link to={"/following"}>
          <FollowingLabel pathname={pathname}>Following</FollowingLabel>
        </Link>
        <DivideLine />
        <Link to={"/nature"}>
          <NatureLabel pathname={pathname}>Nature</NatureLabel>
        </Link>
        <Link to={"/fashion"}>
          <FashionLabel pathname={pathname}>Fashion</FashionLabel>
        </Link>
        <Link to={"/animal"}>
          <AnimalLabel pathname={pathname}>Animal</AnimalLabel>
        </Link>
      </HeaderBottom>
    </HeaderContainer>
  );
};

export default HeaderPresenter;
