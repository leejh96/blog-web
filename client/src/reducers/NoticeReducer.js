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
    DELETE_NOTICE_COMMENT,
    UPDATE_NOTICE,
    DELETE_NOTICE,
    SEARCH_NOTICE,
    NOTICE_ERROR,
    LIKE_ERROR,

} from "../actions/type"

const initialState = {
    notices : [],
    commentLength : 0,
    selectdNotice : {},
    likeCount : 0,
    searchNotices : [],
    error : false,
}
const NoticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTICE:
            return {
                ...state,
                notices : [...action.data],
                error : false,
            };
        case LOAD_ONE_NOTICE:
            return {
                ...state,
                selectdNotice : {...action.data},
                error : false,

            };
        case CREATE_NOTICE_COMMENT:
            return {
                ...state,
                commentLength : state.commentLength + 1,
                error : false,

            }
        case LOAD_LIKE:
            return {
                ...state,
                likeCount : action.data.length,
                error : false,

            };
        case ADD_LIKE:
            return {
                ...state,
                likeCount : action.data,
                error : false,

            };
        case DELETE_LIKE:
            return {
                ...state,
                likeCount : action.data,
                error : false,

            };
        case CREATE_NOTICE:
            return {
                ...state,
                notices : [...state.notices, action.data],
                error : false,

            };
        case LOAD_COMMENT:
            return {
                ...state,
                commentLength : action.data.length,
                error : false,

            }
        case DELETE_NOTICE_COMMENT:
            return {
                ...state,
                commentLength : state.commentLength - 1,
                error : false,

            }
        case SEARCH_NOTICE:
            return {
                ...state,
                searchNotices : [...action.data],
                error : false,
            }
        case UPDATE_NOTICE:
            return {
                ...state,
                error : false,
            }
        case DELETE_NOTICE:
            return {
                ...state,
                error : false,
            }
        case NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LIKE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        default:
            return state;
    }
}


export default NoticeReducer;