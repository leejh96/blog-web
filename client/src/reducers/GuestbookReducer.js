// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    CREATE_GUESTBOOK, 
    DELETE_GUESTBOOK, 
    LOAD_GUESTBOOK, 
    GUESTBOOK_PAGENATION_COUNT 
} from "../actions/type"

const initialState = {
    guestlength : 0,
    guestbook : [],
}
const GuestbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GUESTBOOK:
            return {
                ...state,
                guestlength : state.guestlength + 1,
            };
        case LOAD_GUESTBOOK:
            return {
                ...state,
                guestbook : action.data,
                guestlength : action.data.length
            }; 
        case DELETE_GUESTBOOK:
            return {
                ...state,
                guestlength : state.guestlength - 1,
            }
        case GUESTBOOK_PAGENATION_COUNT:
            return state;
        default:
            return state;
    }
}




export default GuestbookReducer;