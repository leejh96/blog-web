import {
    LOAD_COOKIE,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    ERROR,
} from '../actions/type';

const initialState = {
    role : -1,
    authToken : '',
    error : false
}

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGOUT_USER:
            return {
                ...state,
                role : -1,
                authToken : '',
                error : false,
            }
        case LOGIN_USER :
            return {
                ...state,
                role : action.data.user.role,
                error : false,
            };
        case LOAD_COOKIE:
            return {
                ...state,
                authToken : action.data,
                error : false,
            }
        case ERROR:
            return {
                ...state,
                error : true,
            }
        case REGISTER_USER:
            return {
                ...state,
                role : -1,
                authToken : '',
                error : false,
            }
        default :
            return state;
    }
}

export default UserReducer;