import { combineReducers } from 'redux';
import GuestbookReducer from './GuestbookReducer';
import NoticeReducer from './NoticeReducer';
import StudyReducer from './StudyReducer';
const reducer = combineReducers({
    GuestbookReducer,
    NoticeReducer,
    StudyReducer,
})

export default reducer;