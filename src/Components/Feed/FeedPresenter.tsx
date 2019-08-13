import React from "react";
import styled from "styled-components";
import Theme from "src/Styles/Theme";
import Input from "../Input";

const Background = styled.div`
  background-image: url("https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80");
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InnerBox = styled.div`
  min-width: 700px;
  max-width: 1500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;
const Bold = styled.span`
  font-size: 46px;
  font-weight: 600;
  margin-bottom: 40px;
  color: ${Theme.whiteFontColor};
`;
const Text = styled.span`
  font-size: 20px;
  display: block;
  margin-bottom: 10px;
  color: ${Theme.whiteFontColor};
`;
const InputColumn = styled.div`
  margin-top: 40px;
  display: flex;
`;
const ExInput = styled(Input)`
  width: 700px;
  padding: 15px;
  background-color: ${Theme.lightGreyColor};
  &:focus {
    outline: none;
    box-shadow: 0 14px 28px rgba(255, 255, 255, 0.25),
      0 10px 10px rgba(255, 255, 255, 0.22);
    background-color: ${Theme.whiteFontColor};
  }
  &::placeholder {
    font-size: 15px;
  }
`;
interface IProps {
  term: string;
  onChange: (e) => void;
}
const FeedPresenter: React.SFC<IProps> = ({ term, onChange }) => {
  return (
    <>
      <Background>
        <InnerBox>
          <Bold>Wonsplash</Bold>
          <Text>The internet’s source of freely useable images.</Text>
          <Text>Powered by creators everywhere.</Text>
          <InputColumn>
            <ExInput
              name={"term"}
              value={term}
              placeholder={"Search free high-resolution photos"}
              onChange={onChange}
              customWidth={"200px"}
            />
          </InputColumn>
        </InnerBox>
      </Background>
    </>
  );
};

export default FeedPresenter;
