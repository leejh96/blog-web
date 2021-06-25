// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { CREATE_GUESTBOOK } from "../actions/type"

const initialState = {
    writer : '',
    text : '',
    date : '',
}
const GuestbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GUESTBOOK:
            console.log(action);
            return { ...state, 
                writer : action.data.writer,
                text : action.data.text,
                date : action.data.date
            }
        default:
            return state;
    }
}




export default GuestbookReducer;