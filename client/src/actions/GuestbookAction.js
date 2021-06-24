import axios from 'axios';
import { CREATE_GUESTBOOK, ERROR } from '../actions/type';

//camelCase
export const createGuestBook = (data) => {
    axios.post('/api/guestbook/', data)
    .then(res => {
        if(res.data.success){
            return {
                type : CREATE_GUESTBOOK,
                payload : res.data.createContent
            }
        }
        return {
            type : ERROR,
        };
    })
}