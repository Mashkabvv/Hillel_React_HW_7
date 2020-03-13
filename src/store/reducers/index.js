import {combineReducers} from "redux";
import tables from './reducerTables';
import waiters from './reducerWaiters';


export default combineReducers({
    tables: tables,
    waiters: waiters
});
