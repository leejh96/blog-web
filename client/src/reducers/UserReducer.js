import {
    AUTH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_ERROR,
} from '../actions/type';

const initialState = {
    authToken : '',
    error : false,
    user : {},
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
            console.log(action);
            return {
                ...state,
                user : action.data.user,
                authToken : action.data.accessToken,
                error : false,
            };
        case AUTH_USER:
            return {
                ...state,
                authToken : action.data.token,
                user : action.data.user,
                error : false,
            }
        case AUTH_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        case REGISTER_USER:
            return {
                ...state,
                error : false,
            }
        default :
            return state;
    }
}

export default UserReducer;