import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
}

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
}

export const fetchUsersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        usersData: data
    }
}

export const fetchUsers = (token) => {
    return dispatch => {
        dispatch(fetchUsersStart());
        axios.get('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
            headers: {
              'Authorization': `token ${token}`
            }
          })
            .then(response => {
                dispatch(fetchUsersSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchUsersFail(error));
            });
    }
}