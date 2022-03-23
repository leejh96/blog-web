import {
  AUTH_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  UPDATE_PASSWORD,
  DELETE_USER,
} from "../actions/type";

const initialState = {
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ERROR:
    case UPDATE_PASSWORD:
    case DELETE_USER:
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
      };
    case AUTH_USER:
      return {
        ...state,
        user: action.data.user,
      };
    default:
      return state;
  }
};

export default UserReducer;
