import { combineReducers } from 'redux';
import GuestbookReducer from './GuestbookReducer';
import NoticeReducer from './NoticeReducer';
const reducer = combineReducers({
    GuestbookReducer,
    NoticeReducer,
})

export default reducer;