// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    LOAD_NOTICE,
    CREATE_NOTICE,
    LOAD_COMMENT,
    LOAD_ONE_NOTICE,
    CREATE_NOTICE_COMMENT,
    LOAD_LIKE,
    ADD_LIKE,
    DELETE_LIKE,

} from "../actions/type"

const initialState = {
    notices : [],
    commentLength : 0,
    selectdNotice : {},
    likeCount : 0,
}
const NoticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTICE:
            return {
                ...state,
                notices : [...action.data],
            };
        case LOAD_ONE_NOTICE:
            return {
                ...state,
                selectdNotice : {...action.data}
            };
        case CREATE_NOTICE_COMMENT:
            return {
                ...state,
                commentLength : state.commentLength + 1,
            }
        case LOAD_LIKE:
            return {
                ...state,
                likeCount : action.data.length,
            };
        case ADD_LIKE:
            return {
                ...state,
                likeCount : action.data,
            };
        case DELETE_LIKE:
            return {
                ...state,
                likeCount : action.data,
            };
        case CREATE_NOTICE:
            return {
                ...state,
                notices : [...state.notices, action.data]
            };
        case LOAD_COMMENT:
            return {
                ...state,
                commentLength : action.data.length,
            }
        default:
            return state;
    }
}


export default NoticeReducer;