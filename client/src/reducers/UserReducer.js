import {
    AUTH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_ERROR,
    UPDATE_ERROR,
    UPDATE_NICK,
    UPDATE_PASSWORD,
    DELETE_USER,
    DELETE_ERROR,
    UPDATE_IMAGE,
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
        case UPDATE_NICK:
            return {
                ...state,
                user : action.data.user,
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                user : action.data.user,
            }
        case DELETE_USER:
            return {
                ...state,
                authToken : '',
                error : false,
                user : {},
            }
        case DELETE_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        case UPDATE_IMAGE:
            return{
                ...state,
                error : false,
                user : action.data.user
            }
        case UPDATE_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        default :
            return state;
    }
}

export default UserReducer;