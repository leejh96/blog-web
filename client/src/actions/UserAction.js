import axios from 'axios';
import { CONNECT_SESSION, LOGIN_USER, LOGOUT_USER, REGISTER_USER, ERROR } from './type';

export const registerUser = ({ username, nick, email, password }) => async dispatch => {
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
};

export const loginUser = (email, password) => async dispatch => {
    const data = { email, password };
    const res = await axios.post('/api/user/login', data);
    if(res.data.success){
        return dispatch({
            type : LOGIN_USER,
            data : res.data
        })
    }
    return dispatch({
        type :  ERROR,
        data : res.data,
    })
};

export const logoutUser = () => async dispatch => {
    const res = await axios.get('/api/user/logout');
    if(res.data.success){
        return dispatch({
            type : LOGOUT_USER,
            data : res.data
        })
    }
    return dispatch({
        type : ERROR,
        data : res.data
    })
};

export const loadCookie = access => async dispatch => {
    const config = {
        headers: {
          authorization: access,
        }
      }
    const res = await axios.get('api/user/token', config);
    if(res.data.success){
        return dispatch({
            type : CONNECT_SESSION,
            data : res.data
        });
    }
    return dispatch({
        type : ERROR,
        data : res.data,
    })
}