// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import { 
    LOAD_NOTICE,
    CREATE_NOTICE,
} from "../actions/type"

const initialState = {
    notice : [],
}
const NoticeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTICE:
            return {
                ...state,
                notice : action.data,
            };
        case CREATE_NOTICE:
            return state;
        default:
            return state;
    }
}




export default NoticeReducer;