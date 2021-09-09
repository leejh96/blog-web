import axios from 'axios';
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
    DELETE_IMAGE_ERROR,
    DELETE_IMAGE,
    UPDATE_MOTTO_ERROR,
    UPDATE_MOTTO,
    FIND_PASSWORD,
    NOT_FIND_PASSWORD,
    NEW_PASSWORD,
    NEW_PASSWORD_FAIL,
    REGISTER_USER_ERROR,
    SERVER_ERROR,
    LOGIN_ERROR,
    LOGOUT_ERROR,
    UPDATE_NICK_ERROR,
    UPDATE_PASSWORD_ERROR,
    DELETE_USER_ERROR,
    UPDATE_IMAGE_ERROR,
} from './type';

export const registerUser = ({ username, nick, email, password }) => async dispatch => {
    try {
        const res = await axios.post('/api/user/signup',{
            username,
            nick, 
            email,
            password
        })
        if(res.data.success){
            return dispatch({
                type : REGISTER_USER,
                data : res.data,
            })
        }
        return dispatch({
            type : REGISTER_USER_ERROR,
            data : res.data,
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        })
    }
};

export const loginUser = (email, password) => async dispatch => {
    try {
        const data = { email, password };
        const res = await axios.post('/api/user/login', data);
        if(res.data.success){
            return dispatch({
                type : LOGIN_USER,
                data : res.data
            })
        }
        return dispatch({
            type : LOGIN_ERROR,
            data : res.data,
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        })
    }
};

export const logoutUser = access => async dispatch => {
    try {
        const config = {
            headers: {
              authorization: access,
            }
        }
        const res = await axios.get('/api/user/logout', config);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : LOGOUT_USER,
                data : res.data
            })
        }
        //middleware auth에서 오류
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : LOGOUT_ERROR,
                data : res.data
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        })
    }
};

export const authUser = access => async dispatch => {
    try {
        const config = {
            headers: {
              authorization: access,
            }
        }
        const res = await axios.get('/api/user/auth', config);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : AUTH_USER,
                data : res.data
            });
        }
        return dispatch({
            type : AUTH_ERROR,
            data : res.data,
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        })
    }
}

export const changeNick = text => async dispatch => {
    try {
        const res = await axios.put(`/api/user/nick`, { nick : text })
        if(res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_NICK,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_NICK_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const changePassword = text => async dispatch => {
    try {
        const res = await axios.put(`/api/user/password`, { password : text })
        if(res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_PASSWORD,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_PASSWORD_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const resignUser = password => async dispatch => {
    try {
        const res = await axios.delete('/api/user', { data : { password }})
        if( res.data.success && res.data.auth){
            return dispatch({
                type : DELETE_USER,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : DELETE_USER_ERROR,
                data : res.data
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const resignOAuthUser = () => async dispatch => {
    try {
        const res = await axios.delete('/api/user/oauth')
        if(res.data.success){
            return dispatch({
                type : DELETE_USER,
                data : res.data,
            })
        }
        return dispatch({
            type : DELETE_USER_ERROR,
            data : res.data
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const uploadImage = file => async dispatch => {
    try {
        console.log(file);
        const res = await axios.put('/api/user/img', file,{ headers : { "Content-Type": "multipart/form-data" }});
        if(res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_IMAGE,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_IMAGE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const deleteImg = img => async dispatch => {
    try {
        const res = await axios.put('/api/user/deleteimg', {img});
        if(res.data.success && res.data.auth){
            return dispatch({
                type : DELETE_IMAGE,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : DELETE_IMAGE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const updateMotto = text => async dispatch => {
    try {
        const res = await axios.put('/api/user/motto', { text })
        if(res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_MOTTO,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_MOTTO_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const findPassword = (name, email) => async dispatch => {
    try {
        const res = await axios.post('/api/user/findpassword', { email, name });
        if(res.data.success){
            return dispatch({
                type : FIND_PASSWORD,
                data : res.data,
            })
        }
        return dispatch({
            type : NOT_FIND_PASSWORD,
            data : res.data
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}

export const newPassword = (password, id) => async dispatch => {
    try {
        const res = await axios.post('/api/user/newpassword', { password, id });
        if(res.data.success){
            return dispatch({
                type : NEW_PASSWORD,
                data : res.data,
            })
        }
        return dispatch({
            type : NEW_PASSWORD_FAIL,
            data : res.data
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false
            }
        })
    }
}