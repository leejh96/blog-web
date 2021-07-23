// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    CREATE_STUDY,
    DELETE_STUDY, 
    LOAD_STUDY,
    LOAD_ONE_STUDY,
    UPDATE_STUDY_TEXT,
    STUDY_ERROR,
    CREATE_STUDY_COMMENT,
    LOAD_STUDY_COMMENT,
    DELETE_STUDY_COMMENT,
    STUDY_COMMENT_ERROR,
} from "../actions/type"

const initialState = {
    studyCount : 0,
    studies : [],
    error : false,
    commentLength : 0,
}
const StudyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STUDY:
            return {
                ...state,
                studyCount : state.studyCount + 1,
                error : false,
            };
        case LOAD_STUDY:
            return {
                ...state,
                study : action.data,
                studyCount : action.data.length,
                error : false,
            }
        case DELETE_STUDY:
            return {
                ...state,
                studyCount : state.studyCount - 1,
                error : false,
            }
        case STUDY_ERROR:
            return {
                studyCount : 0,
                studies : [],
                error : true,
            }
        case LOAD_ONE_STUDY:
            return {
                ...state,
                error: false,
            }
        case UPDATE_STUDY_TEXT:
            return {
                ...state,
                error: false,
            }
        case LOAD_STUDY_COMMENT:
            return {
                ...state,
                commentLength : action.data.length,
                error : false,
            }
        case CREATE_STUDY_COMMENT:
            return {
                ...state,
                commentLength : state.commentLength + 1,
                error : false,
            }
        case DELETE_STUDY_COMMENT:
            return {
                ...state,
                commentLength : state.commentLength - 1,
                error : false,

            }
        case STUDY_COMMENT_ERROR:
            return {
                ...state,
                studyCount : 0,
                studies : [],
                error : true,
                commentLength : 0,
            }
        default:
            return state;
    }
}

export default StudyReducer;