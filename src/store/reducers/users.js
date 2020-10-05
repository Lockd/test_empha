import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: {
        data: null,

        get idSortedAscending() {
            if (this.data) {
                const sortedData = this.data.sort((prevEl, el) => {
                    return prevEl.id - el.id;
                });
                return sortedData;
            } else {
                return undefined;
            }            
        }
    },
    error: null,
    loading: false
}

const fetchUsersStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const fetchUsersSuccess = (state, action) => {
    const updatedUsersData = updateObject(state.users, {data: action.usersData});
    return updateObject(state, {
        users: updatedUsersData,
        loading: false
    });
}

const fetchUsersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
        default: return state;
    }
}

export default reducer;