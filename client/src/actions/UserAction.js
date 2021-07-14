import axios from 'axios';
import { AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_ERROR } from './type';

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