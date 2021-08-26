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
    LOAD_COMMENT_ERROR,
    LOAD_LIKE_ERROR,
    LOAD_NOTICE_ERROR,
    LOAD_ONE_NOTICE_VALID_ERROR,
    LOAD_ONE_NOTICE_ERROR,
    LOAD_COMMENT_VALID_ERROR,
    CREATE_NOTICE_ERROR,
    SERVER_ERROR,
    UPDATE_NOTICE_ERROR,
    UPDATE_NOTICE_VALID_ERROR,
    DELETE_NOTICE_ERROR,
    CREATE_NOTICE_COMMENT_ERROR,
    LOAD_LIKE_VALID_ERROR,
    ADD_LIKE_ERROR,
    DELETE_LIKE_ERROR,
    DELETE_NOTICE_COMMENT_ERROR,
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
                likeCount : action.data.notice.like.length,
                error : false,

            };
        case DELETE_LIKE:
            return {
                ...state,
                likeCount : action.data.notice.like.length,
                error : false,
            };
        case CREATE_NOTICE:
            return {
                ...state,
                notices : [...state.notices, action.data.notice],
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
        case LOAD_COMMENT_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_LIKE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_ONE_NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_ONE_NOTICE_VALID_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_COMMENT_VALID_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case CREATE_NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case SERVER_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case UPDATE_NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case UPDATE_NOTICE_VALID_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case DELETE_NOTICE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case CREATE_NOTICE_COMMENT_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case LOAD_LIKE_VALID_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case ADD_LIKE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case DELETE_LIKE_ERROR:
            return {
                ...state,
                notices : [],
                commentLength : 0,
                selectdNotice : {},
                likeCount : 0,
                searchNotices : [],
                error : true,
            }
        case DELETE_NOTICE_COMMENT_ERROR:
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