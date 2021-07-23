import axios from 'axios';
import { 
    AUTH_USER,
    LOGIN_USER, 
    LOGOUT_USER, 
    REGISTER_USER, 
    AUTH_ERROR, 
    UPDATE_ERROR, 
    UPDATE_NICK, 
    UPDATE_PASSWORD,
    DELETE_ERROR,
    DELETE_USER,
    UPDATE_IMAGE,
    DELETE_IMAGE_ERROR,
    DELETE_IMAGE,
} from './type';

export const registerUser = ({ username, nick, email, password }) => async dispatch => {
    try {
        const res = await axios.post('/api/user/signup',{
            username,
            nick, 
            email,
            password
        })
        return dispatch({
            type : REGISTER_USER,
            data : res.data.success,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : AUTH_ERROR,
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
            type : AUTH_ERROR,
            data : res.data,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : AUTH_ERROR,
        })
    }
};

export const logoutUser = () => async dispatch => {
    try {
        const res = await axios.get('/api/user/logout');
        if(res.data.success){
            return dispatch({
                type : LOGOUT_USER,
                data : res.data
            })
        }
        return dispatch({
            type : AUTH_ERROR,
            data : res.data
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : AUTH_ERROR,
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
        if(res.data.success){
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
        console.error(error);
        return dispatch({
            type : AUTH_ERROR,
        })
    }
}

export const changeNick = text => async dispatch => {
    try {
        const res = await axios.put(`/api/user/nick`, { nick : text })
        console.log(res);
        if(res.data.success){
            return dispatch({
                type : UPDATE_NICK,
                data : res.data,
            })
        }
    } catch (error) {
        console.error(error);
        return dispatch({
            type : UPDATE_ERROR,
        })
    }
}

export const changePassword = text => async dispatch => {
    try {
        const res = await axios.put(`/api/user/password`, { password : text })
        if(res.data.success){
            return dispatch({
                type : UPDATE_PASSWORD,
                data : res.data,
            })
        }
        return dispatch({
            type : UPDATE_ERROR,
            data : res.data,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : UPDATE_ERROR,
        })
    }
}

export const resignUser = password => async dispatch => {
    try {
        const res = await axios.delete('/api/user', { data : { password }})
        return dispatch({
            type : DELETE_USER,
            data : res.data,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : DELETE_ERROR,
        })
    }

}

export const uploadImage = file => async dispatch => {
    try {
        const res = await axios.put('/api/user/img', file,{ headers : { "Content-Type": "multipart/form-data" }});
        if(res.data.success){
            return dispatch({
                type : UPDATE_IMAGE,
                data : res.data,
            })
        }
        return dispatch({
            type : UPDATE_ERROR,
            data : res.data,
        })

    } catch (error) {
        console.error(error);
        return dispatch({
            type : UPDATE_ERROR,
        })
    }
}

export const deleteImg = img => async dispatch => {
    try {
        const res = await axios.put('/api/user/deleteimg', {img});
        if(res.data.success){
            return dispatch({
                type : DELETE_IMAGE,
                data : res.data,
            })
        }
    } catch (error) {
        console.error(error);
        return dispatch({
            type : DELETE_IMAGE_ERROR,
        })
    }
}