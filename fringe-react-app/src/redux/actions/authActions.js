export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';
export const SET_USER_ID = 'SET_USER_ID';

export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});

export const setIsAdmin = (isAdmin) => {
  return { type: SET_IS_ADMIN, payload: isAdmin };
};

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};
