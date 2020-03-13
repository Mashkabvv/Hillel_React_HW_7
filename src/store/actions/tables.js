import api from "../../services/api";

export const SET_TABLES_ACTION = 'SET_TABLES_ACTION';
export const SET_TABLES_LOADING_ACTION = 'SET_TABLES_LOADING_ACTION';
export const SEARCH_TABLE_ACTION = 'SEARCH_TABLE_ACTION';
export const DELETE_TABLE_ACTION = 'DELETE_TABLE_ACTION';
export const SAVE_TABLE_ACTION = 'SAVE_TABLE_ACTION';

export function setTablesLoading(isLoading) {
    return {
        type: SET_TABLES_LOADING_ACTION,
        payload: isLoading
    }
}

export function setTables(tables) {
    return {
        type: SET_TABLES_ACTION,
        payload: tables
    }
}

export function onSearch(name) {
    return {
        type: SEARCH_TABLE_ACTION,
        payload: name
    }
}

export function getTables() {
    return function (dispatch) {
        dispatch(setTablesLoading(true));
        api.get('tables').then(resp => {
            dispatch(setTables(resp.data));
            dispatch(setTablesLoading(false));
        });
        
    }
}

export function onDelete(id) {
    return function(dispatch) {
        dispatch(setTablesLoading(true));
        api.delete(`tables/${id}`).then(resp => {
            dispatch({type: DELETE_TABLE_ACTION, payload: resp.data});
            dispatch(setTablesLoading(false));
        });
    }
}

export function onTableSave(table) {
    return function (dispatch) {
        dispatch(setTablesLoading(true));
        table.id
            ? api.put(`tables/${table.id}`, table).then(resp => {
                dispatch({type: SAVE_TABLE_ACTION, payload: resp.data});
                dispatch(setTablesLoading(false));
            })
            : api.post('tables', table).then(resp => {
                dispatch({type: SAVE_TABLE_ACTION, payload: resp.data});
                dispatch(setTablesLoading(false));
            })
    }
}
