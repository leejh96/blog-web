// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import {
  CREATE_GUESTBOOK,
  DELETE_GUESTBOOK,
  LOAD_GUESTBOOK,
  COUNT_GUESTBOOK,
} from "../actions/type";

const initialState = {
  guestbooks: [],
  count: 0,
};
const GuestbookReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GUESTBOOK:
      return {
        ...state,
        count: state.count + 1,
      };
    case COUNT_GUESTBOOK:
      return {
        ...state,
        count: action.data.count,
      };
    case LOAD_GUESTBOOK:
      return {
        ...state,
        guestbooks: action.data.guestbooks,
      };
    case DELETE_GUESTBOOK:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default GuestbookReducer;
