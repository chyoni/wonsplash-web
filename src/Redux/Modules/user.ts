// import
import axios from "axios";
import { Dispatch } from "redux";

// actionsTypes
const SAVE_TOKEN = "SAVE_TOKEN";

// Action
function saveToken(token: string) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

// API actions
function facebookLogin(accessToken: string) {
  return (dispatch: Dispatch) => {
    axios
      .post("/users/login/facebook/", {
        access_token: accessToken
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.token) {
            dispatch(saveToken(res.data.token));
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
        console.log(res);
        if (res.status === 200) {
          if (res.data && res.data.token) {
            dispatch(saveToken(res.data.token));
          }
        }
      })
      .catch(err => console.log(err));
  };
}

// initialState
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
};

// reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySaveToken(state, action);
    default:
      return state;
  }
}

// reducer function
function applySaveToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true
  };
}

// exports
export const actionCreators = {
  facebookLogin,
  usernameLogin
};

export default reducer;
