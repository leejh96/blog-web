import { combineReducers } from 'redux';
import GuestbookReducer from './GuestbookReducer';
import NoticeReducer from './NoticeReducer';
import StudyReducer from './StudyReducer';
import UserReducer from './UserReducer';
const reducer = combineReducers({
    GuestbookReducer,
    NoticeReducer,
    StudyReducer,
    UserReducer,
})

export default reducer;