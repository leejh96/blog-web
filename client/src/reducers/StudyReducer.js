// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import {
  CREATE_STUDY,
  DELETE_STUDY,
  LOAD_STUDY,
  LOAD_ONE_STUDY,
  CREATE_STUDY_COMMENT,
  DELETE_STUDY_COMMENT,
} from "../actions/type";

const initialState = {
  count: 0,
  studies: [],
  countComment: 0,
  study: {},
};
const StudyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ONE_STUDY:
      return {
        ...state,
        countComment: action.data.study.comment.length,
        study: action.data.study,
      };
    case CREATE_STUDY_COMMENT:
      return {
        ...state,
        countComment: state.countComment + 1,
      };
    case DELETE_STUDY_COMMENT:
      return {
        ...state,
        countComment: state.countComment - 1,
      };
    case LOAD_STUDY:
      return {
        ...state,
        studies: action.data.studies,
        count: action.data.studies.length,
      };

    case CREATE_STUDY:
      return {
        ...state,
        count: state.count + 1,
      };
    case DELETE_STUDY:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default StudyReducer;
