import {SET_WAITERS_ACTION, SET_WAITERS_LOADING_ACTION, SEARCH_WAITER_ACTION, DELETE_WAITER_ACTION, SAVE_WAITER_ACTION} from '../actions/waiters';

const initialState = {
    listWaiters: [],
    search: '',
    isLoading: true
};

export default (state = initialState, {type, payload}) => {
    
    function createWaiter() {
        // console.log('create', payload);
        return [...state.listWaiters, payload]
    }
    function updateWaiter() {
        // console.log('update', payload);
        return state.listWaiters.map(item => item.id === payload.id ? payload : item)
    }
    
    switch (type) {
        case SET_WAITERS_LOADING_ACTION:
            // debugger;
            return{
                ...state,
                isLoading: payload
            };
        case SET_WAITERS_ACTION:
            // debugger;
            return{
                ...state,
                listWaiters: payload
            };
        case SEARCH_WAITER_ACTION:
            // debugger;
            return{
                ...state,
                search: payload
            };
        case DELETE_WAITER_ACTION:
            // debugger;
            return{
                ...state,
                listWaiters: state.listWaiters.filter(item => item.id !== payload.id)
            };
        case SAVE_WAITER_ACTION:
            // debugger;
            return{
                ...state,
                listWaiters: state.listWaiters.find(item => item.id === payload.id ) === undefined ? createWaiter() : updateWaiter()
            };
        
        default:
            return state
    }
}
