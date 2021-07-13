import {
    CONNECT_SESSION,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    ERROR,
} from '../actions/type';

const initialState = {
    authToken : '',
    error : false
}

const UserReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGOUT_USER:
            return {
                ...state,
                authToken : '',
                error : false,
            }
        case LOGIN_USER :
            return {
                ...state,
                error : false,
            };
        case CONNECT_SESSION:
            return {
                ...state,
                authToken : action.data.token,
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
                authToken : '',
                error : false,
            }
        default :
            return state;
    }
}

export default UserReducer;