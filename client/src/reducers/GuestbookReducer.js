// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { CREATE_GUESTBOOK, DELETE_GUESTBOOK, LOAD_GUESTBOOK } from "../actions/type"

const initialState = {
    addGuestbook : {},
    delGuestbook : {},
    guestbook : [],
}
const GuestbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GUESTBOOK:
            state.addGuestbook = {...action.data};
            return state;
        case LOAD_GUESTBOOK:
            state.guestbook = [...action.data];
            return state; 
        case DELETE_GUESTBOOK:
            state.delGuestbook = {...action.data};
            return state;
        default:
            return state;
    }
}




export default GuestbookReducer;