// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    CREATE_STUDY,
    DELETE_STUDY, 
    LOAD_STUDY,
    LOAD_ONE_STUDY,
    UPDATE_STUDY_TEXT
} from "../actions/type"

const initialState = {
    studyCount : 0,
    studies : [],
}
const StudyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_STUDY:
            return {
                ...state,
                studyCount : state.studyCount + 1,
            };
        case LOAD_STUDY:
            return {
                ...state,
                study : action.data,
                studyCount : action.data.length
            }
        case DELETE_STUDY:
            return {
                ...state,
                studyCount : state.studyCount - 1,
            }
        case LOAD_ONE_STUDY:
        case UPDATE_STUDY_TEXT:
        default:
            return state;
    }
}

export default StudyReducer;