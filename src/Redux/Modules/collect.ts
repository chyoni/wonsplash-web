// import
import axios from "axios";
import { Dispatch } from "redux";
interface IFeedArray {
  id: number;
  creator: object;
  file: string;
  is_liked: boolean;
  like_count: number;
  natural_time: string;
  tags: any;
  views: number;
}

// actionTypes
const FEED = "FEED";

// action
function saveFeed(data: Array<[IFeedArray]>) {
  return {
    type: FEED,
    data
  };
}

// API action
function feed() {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem("jwt");
    axios
      .get("/collects/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data) {
            dispatch(saveFeed(res.data));
          }
        } else {
          console.log("error for this", res.status, res.statusText);
        }
      })
      .catch(err => console.log(err));
  };
}

// initialState
const initialState = {
  feedArray: []
};
// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FEED:
      return applySaveFeed(state, action);
    default:
      return state;
  }
}

// reducer function
function applySaveFeed(state, action) {
  const { data } = action;
  return {
    ...state,
    feedArray: data
  };
}

// actionCreators
export const actionCreators = {
  feed
};
// exports
export default reducer;
