import {
    AUTH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    AUTH_ERROR,
    UPDATE_NICK,
    UPDATE_PASSWORD,
    DELETE_USER,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    DELETE_IMAGE_ERROR,
    UPDATE_MOTTO,
    UPDATE_MOTTO_ERROR,
    FIND_PASSWORD,
    NOT_FIND_PASSWORD,
    NEW_PASSWORD,
    NEW_PASSWORD_FAIL,
    REGISTER_USER_ERROR,
    LOGIN_ERROR,
    LOGOUT_ERROR,
    UPDATE_NICK_ERROR,
    UPDATE_PASSWORD_ERROR,
    DELETE_USER_ERROR,
    UPDATE_IMAGE_ERROR,
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
                user : {},
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
            };
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
        case UPDATE_IMAGE:
            return{
                ...state,
                error : false,
                user : {...state.user, img : action.data.file}
            }
        case DELETE_IMAGE:
            return {
                ...state,
                error : false,
                user : {
                    ...state.user,
                    img : action.data.img,
                }
            }
        case DELETE_IMAGE_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        case UPDATE_MOTTO:
            return {
                ...state,
                user : {
                    ...state.user,
                    motto : action.data.motto
                },
                error : false,
            }
        case REGISTER_USER_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        case UPDATE_MOTTO_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
            }
        case FIND_PASSWORD:
            return {
                ...state,
                error : false,
            }
        case NOT_FIND_PASSWORD:
            return {
                ...state,
            }
        case NEW_PASSWORD:
            return {
                ...state,
                error : false,
            }
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        case LOGOUT_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        case UPDATE_NICK_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        case UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        case DELETE_USER_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        case UPDATE_IMAGE_ERROR:
            return {
                ...state,
                authToken : '',
                user : {},
                error : true,
            }
        default :
            return state;
    }
}

export default UserReducer;