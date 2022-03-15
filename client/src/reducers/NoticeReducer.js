// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import {
  LOAD_NOTICE,
  CREATE_NOTICE,
  LOAD_ONE_NOTICE,
  CREATE_NOTICE_COMMENT,
  ADD_LIKE,
  DELETE_LIKE,
  DELETE_NOTICE_COMMENT,
  DELETE_NOTICE,
  SEARCH_NOTICE,
  COUNT_NOTICE,
} from "../actions/type";

const initialState = {
  count: 0,
  notices: [],
  search: false,
  countSearch: 0,

  countComment: 0,
  countLike: 0,
  notice: {},
};
const NoticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTICE:
      return {
        ...state,
        notices: action.data.notices,
        search: false,
      };
    case LOAD_ONE_NOTICE:
      return {
        ...state,
        notice: action.data.notice,
        countLike: action.data.notice.like.length,
        countComment: action.data.notice.comment.length,
      };
    case CREATE_NOTICE_COMMENT:
      return {
        ...state,
        countComment: state.countComment + 1,
      };
    case SEARCH_NOTICE:
      return {
        ...state,
        search: true,
        notices: action.data.notices,
        countSearch: action.data.notices.length,
      };
    case ADD_LIKE:
      return {
        ...state,
        countLike: state.countLike + 1,
      };
    case DELETE_LIKE:
      return {
        ...state,
        countLike: state.countLike - 1,
      };
    case CREATE_NOTICE:
      return {
        ...state,
        count: state.count + 1,
      };
    case DELETE_NOTICE_COMMENT:
      return {
        ...state,
        countComment: state.countComment - 1,
      };
    case DELETE_NOTICE:
      return {
        ...state,
        countComment: 0,
        countLike: 0,
        notice: {},
      };
    case COUNT_NOTICE:
      return {
        ...state,
        count: action.data.count,
      };
    default:
      return state;
  }
};

export default NoticeReducer;
