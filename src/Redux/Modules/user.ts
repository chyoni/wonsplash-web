// import
// actions
// action Creators
// API actions
// initialState

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
};
// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
// reducer function
// exports

export default reducer;
