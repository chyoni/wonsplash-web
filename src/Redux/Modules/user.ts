// import
import axios from "axios";
import { Dispatch } from "redux";

// actionsTypes
const SAVE_TOKEN = "SAVE_TOKEN";
const PROFILE = "PROFILE";

// Action
function saveToken(data: object) {
  return {
    type: SAVE_TOKEN,
    data
  };
}
function saveProfile(data: object) {
  return {
    type: PROFILE,
    data
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
  const { data: my } = action;
  return {
    ...state,
    my
  };
}

// exports
export const actionCreators = {
  facebookLogin,
  usernameLogin,
  registration,
  profile
};

export default reducer;
