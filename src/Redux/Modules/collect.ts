// import
import axios from "axios";
import { Dispatch } from "redux";

// types
export interface IDetailPhoto {
  id: number;
  file: string;
  creator: {
    id: number;
    username: string;
    avatar: string;
  };
  is_liked: boolean;
  like_count: number;
  natural_time: string;
  tags: any;
  views: number;
}

// actionTypes
const FEED = "FEED";
const TOGGLE_LIKE = "TOGGLE_LIKE";
const DETAIL = "DETAIL";
const SEARCH = "SEARCH";
// action
function saveFeed(data: IDetailPhoto[]) {
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
function saveDetailPhoto(data: IDetailPhoto) {
  return {
    type: DETAIL,
    data
  };
}
function saveSearchPhoto(data: IDetailPhoto[]) {
  return {
    type: SEARCH,
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
function detailPhoto(imageId: number) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .get(`/collects/detail/${imageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveDetailPhoto(res.data));
        } else {
          console.log("error =>", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function searchByTerm(term: string) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .get(`/collects/search/?term=${term}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveSearchPhoto(res.data));
        } else {
          console.log("error =>", res.status, res.statusText, res.data);
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
    case DETAIL:
      return applyDetailPhoto(state, action);
    case SEARCH:
      return applySearchPhoto(state, action);
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
  if (state.photo) {
    const {
      photo: { id }
    } = state;
    if (id === imageId) {
      return {
        ...state,
        feedArray: [
          ...state.feedArray.map(p => {
            if (p.id === imageId) {
              p.is_liked = !p.is_liked;
              return p;
            } else {
              return p;
            }
          })
        ],
        photo: {
          ...state.photo,
          is_liked: !state.photo.is_liked
        }
      };
    } else {
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
  } else {
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
}
function applyDetailPhoto(state, action) {
  const { data } = action;
  return {
    ...state,
    photo: data
  };
}
function applySearchPhoto(state, action) {
  const { data } = action;
  return {
    ...state,
    feedArray: data
  };
}

// actionCreators
export const actionCreators = {
  feed,
  likePhoto,
  unlikePhoto,
  detailPhoto,
  searchByTerm
};
// exports
export default reducer;
