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
const TOGGLE_LIKE = "TOGGLE_LIKE";
// action
function saveFeed(data: Array<[IFeedArray]>) {
  return {
    type: FEED,
    data
  };
}
function saveToggleLikePhoto(imageId: number) {
  return {
    type: TOGGLE_LIKE,
    imageId
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
function likePhoto(imageId: number) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .post(`/collects/like/${imageId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 201) {
          dispatch(saveToggleLikePhoto(imageId));
        } else {
          console.log("error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function unlikePhoto(imageId: number) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .delete(`/collects/unlike/${imageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleLikePhoto(imageId));
        } else {
          console.log("error => ", res.status, res.statusText, res.data);
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
    case TOGGLE_LIKE:
      return applyToggleLikePhoto(state, action);
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
function applyToggleLikePhoto(state, action) {
  const { imageId } = action;
  return {
    ...state,
    feedArray: [
      ...state.feedArray.map(photo => {
        if (photo.id === imageId) {
          photo.is_liked = !photo.is_liked;
          return photo;
        } else {
          return photo;
        }
      })
    ]
  };
}

// actionCreators
export const actionCreators = {
  feed,
  likePhoto,
  unlikePhoto
};
// exports
export default reducer;
