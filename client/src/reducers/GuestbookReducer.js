// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    CREATE_GUESTBOOK, 
    DELETE_GUESTBOOK, 
    LOAD_GUESTBOOK, 
    GUESTBOOK_PAGENATION_COUNT,
    GUESTBOOK_ERROR
} from "../actions/type"

const initialState = {
    guestlength : 0,
    guestbook : [],
    error : false,
}
const GuestbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GUESTBOOK:
            return {
                ...state,
                guestlength : state.guestlength + 1,
                error : false,

            };
        case LOAD_GUESTBOOK:
            return {
                ...state,
                guestbook : action.data,
                guestlength : action.data.length,
                error : false,

            }; 
        case DELETE_GUESTBOOK:
            return {
                ...state,
                guestlength : state.guestlength - 1,
                error : false,

            }
        case GUESTBOOK_PAGENATION_COUNT:
            return {
                ...state, 
                error : false,
            };
        case GUESTBOOK_ERROR:
            return {
                ...state,
                guestlength : 0,
                guestbook : [],
                error : true,
            }
        default:
            return state;
    }
}




export default GuestbookReducer;