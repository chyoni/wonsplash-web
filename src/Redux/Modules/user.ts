// import
import axios from "axios";
import { Dispatch } from "redux";
import { push } from "react-router-redux";
import { IDetailPhoto } from "./collect";
// types
export interface IProfile {
  id: number;
  username: string;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  followers_count: number;
  following_count: number;
  is_following: boolean;
  is_self: boolean;
  post_count: number;
  images: IDetailPhoto[];
}
export interface IMyLikes {
  id: number;
  natural_time: string;
  image: {
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
  };
}
// actionsTypes
const SAVE_TOKEN = "SAVE_TOKEN";
const PROFILE = "PROFILE";
const MY_LIKES = "MY_LIKES";
const ANYONE_PROFILE = "ANYONE_PROFILE";
const TOGGLE_FOLLOW = "TOGGLE_FOLLOW";

// Action
function saveToken(data: object) {
  return {
    type: SAVE_TOKEN,
    data
  };
}
function saveProfile(data: IProfile) {
  return {
    type: PROFILE,
    data
  };
}
function saveMyLikes(data: IMyLikes[]) {
  return {
    type: MY_LIKES,
    data
  };
}
function saveAnyoneProfile(data: IProfile) {
  return {
    type: ANYONE_PROFILE,
    data
  };
}
function saveToggleFollow(userId: number) {
  return {
    type: TOGGLE_FOLLOW,
    userId
  };
}

// API actions
function facebookLogin(accessToken: string) {
  return (dispatch: Dispatch) => {
    axios
      .post("/users/login/facebook/", {
        access_token: accessToken
      })
      .then(async res => {
        if (res.status === 200) {
          if (res.data && res.data.token) {
            console.log(res);
            await dispatch(saveToken(res.data));
            window.location.href = "/";
          }
        }
      })
      .catch(err => console.log(err));
  };
}
function usernameLogin(username: string, password: string) {
  return (dispatch: Dispatch) => {
    axios
      .post("/rest-auth/login/", {
        username,
        password
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.token) {
            dispatch(saveToken(res.data));
          }
        }
      })
      .catch(err => console.log(err));
  };
}
function registration(
  username: string,
  password1: string,
  password2: string,
  email: string
) {
  return (dispatch: Dispatch) => {
    axios
      .post("/rest-auth/registration/", {
        username,
        password1,
        password2,
        email
      })
      .then(async res => {
        if (res.status === 201) {
          if (res.data && res.data.token) {
            await dispatch(saveToken(res.data));
            window.location.href = "/";
          }
        }
      })
      .catch(err => console.log(err));
  };
}
function profile(username: string) {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem("jwt");
    axios
      .get(`/users/${username}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data) {
            dispatch(saveProfile(res.data));
          }
        } else {
          console.log(res.status, res.statusText);
        }
      })
      .catch(err => console.log(err));
  };
}
function myLikes() {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .get("/users/mylikes/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveMyLikes(res.data));
        } else {
          console.log("error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function anyoneProfile(username: string) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveAnyoneProfile(res.data));
        } else {
          console.log("error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function follow(userId: number) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .post(`/users/follow/${userId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleFollow(userId));
        } else {
          console.log("error => ", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function unfollow(userId: number) {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .post(`/users/unfollow/${userId}/`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch(saveToggleFollow(userId));
        } else {
          console.log("error =>", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}
function logout() {
  const token = localStorage.getItem("jwt");
  return (dispatch: Dispatch) => {
    axios
      .post("/rest-auth/logout/", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async res => {
        if (res.status === 200) {
          await localStorage.removeItem("jwt");
          await localStorage.removeItem("username");
          dispatch(push("/"));
        } else {
          console.log("error =>", res.status, res.statusText, res.data);
        }
      })
      .catch(err => console.log(err));
  };
}

// initialState
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  username: localStorage.getItem("username") || ""
};
// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySaveToken(state, action);
    case PROFILE:
      return applyProfile(state, action);
    case MY_LIKES:
      return applyMyLikes(state, action);
    case ANYONE_PROFILE:
      return applyAnyoneProfile(state, action);
    case TOGGLE_FOLLOW:
      return applyToggleFollow(state, action);
    default:
      return state;
  }
}
// reducer function
function applySaveToken(state, action) {
  const {
    data: { token, user }
  } = action;
  localStorage.setItem("username", user.username);
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    username: user.username
  };
}
function applyProfile(state, action) {
  const { data: me } = action;
  return {
    ...state,
    me
  };
}
function applyMyLikes(state, action) {
  const { data } = action;
  return {
    ...state,
    myLikePhotos: data
  };
}
function applyAnyoneProfile(state, action) {
  const { data } = action;
  return {
    ...state,
    anyone: data
  };
}
function applyToggleFollow(state, action) {
  const { userId } = action;
  if (state.anyone.id === userId) {
    return {
      ...state,
      anyone: {
        ...state.anyone,
        is_following: !state.anyone.is_following
      }
    };
  } else {
    return Error;
  }
}
// exports
export const actionCreators = {
  facebookLogin,
  usernameLogin,
  registration,
  profile,
  anyoneProfile,
  myLikes,
  follow,
  unfollow,
  logout
};

export default reducer;
