import api from "../../services/api";

export const SET_WAITERS_ACTION = 'SET_WAITERS_ACTION';
export const SET_WAITERS_LOADING_ACTION = 'SET_WAITERS_LOADING_ACTION';
export const SEARCH_WAITER_ACTION = 'SEARCH_WAITER_ACTION';
export const DELETE_WAITER_ACTION = 'DELETE_WAITER_ACTION';
export const SAVE_WAITER_ACTION = 'SAVE_WAITER_ACTION';

export function setWaitersLoading(isLoading) {
    return {
        type: SET_WAITERS_LOADING_ACTION,
        payload: isLoading
    }
}

export function setWaiters(waiters) {
    return {
        type: SET_WAITERS_ACTION,
        payload: waiters
    }
}

export function onSearch(name) {
    return {
        type: SEARCH_WAITER_ACTION,
        payload: name
    }
}

export function getWaiters() {
    return function (dispatch) {
        dispatch(setWaitersLoading(true));
        api.get('waiters').then(resp => {
            dispatch(setWaiters(resp.data));
            dispatch(setWaitersLoading(false));
        });
        
    }
}

export function onDelete(id) {
    return function(dispatch) {
        dispatch(setWaitersLoading(true));
        api.delete(`waiters/${id}`).then(resp => {
            dispatch({type: DELETE_WAITER_ACTION, payload: resp.data});
            dispatch(setWaitersLoading(false));
        });
    }
}

export function onWaitersSave(waiter) {
    return function (dispatch) {
        dispatch(setWaitersLoading(true));
        waiter.id
            ? api.put(`waiters/${waiter.id}`, waiter).then(resp => {
                dispatch({type: SAVE_WAITER_ACTION, payload: resp.data});
                dispatch(setWaitersLoading(false));
            })
            : api.post('waiters', waiter).then(resp => {
                dispatch({type: SAVE_WAITER_ACTION, payload: resp.data});
                dispatch(setWaitersLoading(false));
            })
    }
}


