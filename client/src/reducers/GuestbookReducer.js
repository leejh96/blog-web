import { CREATE_GUESTBOOK } from "../actions/action"

const initialState = {
    text : ''
}

const GuestbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GUESTBOOK:
            return { ...state, action.text };
        default:
            return state
    }
}

export default GuestbookReducer;