import { combineReducers } from 'redux';
import MessageReducer from './MessageReducer';

const rootReducer = combineReducers({
    message: MessageReducer
});

export default rootReducer;
