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
    DELETE_IMAGE,
    DELETE_IMAGE_ERROR,
    UPDATE_MOTTO,
    UPDATE_MOTTO_ERROR,
    OAUTH_USER,
    NOT_LOGIN,
    SAME_PASSWORD,
    FIND_PASSWORD,
    FIND_PASSWORD_ERROR,
    NOT_FIND_PASSWORD,
    NEW_PASSWORD,
    NEW_PASSWORD_ERROR,
    NEW_PASSWORD_FAIL
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
        case NOT_LOGIN:
            return {
                ...state,
                authToken : '',
                error : false,
                user : {},
            };
        case OAUTH_USER:
            return {
                ...state,
                authToken : '',
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
        case SAME_PASSWORD:
            return {
                ...state,
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
                user : {...state.user, img : action.data.file}
            }
        case UPDATE_ERROR:
            return {
                ...state,
                authToken : '',
                error : true,
                user : {},
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
        case FIND_PASSWORD_ERROR:
            return {
                ...state,
                error : true,
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
        case NEW_PASSWORD_ERROR:
            return {
                ...state,
                error : true,
            }
        default :
            return state;
    }
}

export default UserReducer;