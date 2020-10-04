import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authToken: token
    }
}
export const authLogout = () => {
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            return dispatch(authLogout());
        } else {
            dispatch(authSuccess(token));
        }
    }
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', { username: username, password: password })
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data.token);
                dispatch(authSuccess(response.data.token));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
}