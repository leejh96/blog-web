import { createStore, combineReducers } from 'redux';
import GuestbookReducer from './GuestbookReducer';

const rootReducer = combineReducers({
    GuestbookReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

