import {
    SET_TABLES_ACTION,
    SET_TABLES_LOADING_ACTION,
    DELETE_TABLE_ACTION,
    SAVE_TABLE_ACTION,
    SEARCH_TABLE_ACTION
} from '../actions/tables';

const initialState = {
    listTables: [],
    search: '',
    isLoading: true
};

export default (state = initialState, {type, payload}) => {
    
    function createTable() {
        // console.log('create', payload);
        return [...state.listTables, payload]
    }
    function updateTable() {
        // console.log('update', payload);
        return state.listTables.map(item => item.id === payload.id ? payload : item)
    }

    switch (type) {
        case SET_TABLES_LOADING_ACTION:
            // debugger;
            return{
                ...state,
                isLoading: payload
            };
        case SET_TABLES_ACTION:
            // debugger;
            return{
                ...state,
                listTables: payload
            };
        case SEARCH_TABLE_ACTION:
            // debugger;
            return{
                ...state,
                search: payload
            };
        case DELETE_TABLE_ACTION:
            // debugger;
            return{
                ...state,
                listTables: state.listTables.filter(item => item.id !== payload.id)
            };
        case SAVE_TABLE_ACTION:
            // debugger;
            return{
                ...state,
                listTables: state.listTables.find(item => item.id === payload.id ) === undefined ? createTable() : updateTable()
            };
       
        default:
            return state
    }
}
