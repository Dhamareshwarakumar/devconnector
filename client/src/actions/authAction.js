import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))

}

// Login Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            // Save to local Storege
            const { token } = res.data;

            // Set Token to Local Storage
            localStorage.setItem('jwtToken', token);

            // Set Token to Auth Header
            setAuthToken(token);

            // Decode JWT token to get User data
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))

        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

// Set Login User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Logout user
export const logoutUser = () => dispatch => {
    // Remove token from the local storage
    localStorage.removeItem('jwtToken');
    // Remove Auth Header
    setAuthToken(false)
    // Set Current user to () {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}