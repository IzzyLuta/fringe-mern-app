import { SET_IS_LOGGED_IN, SET_IS_ADMIN, SET_USER_ID } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      const newState1 = { ...state, isLoggedIn: action.payload };
      console.log('Updated state:', newState1);
      return newState1;
    
    case SET_IS_ADMIN:
      const newState2 = { ...state, isAdmin: action.payload };
      console.log('Updated state:', newState2);
      return newState2;

    case SET_USER_ID:
      const newState3 = { ...state, userId: action.payload };
      console.log('Updated state:', newState3);
      return newState3;
    
    default:
      console.log('Unhandled action type:', action.type); 
      return state;
  }
};

export default authReducer;