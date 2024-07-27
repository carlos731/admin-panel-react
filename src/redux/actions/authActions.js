import axios from 'axios';
import { toast } from 'react-toastify';

export const signup = (userData, navigate) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:9000/auth/register', userData);

        dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: res.data
        });

        dispatch(loadUser());

        navigate('/login'); // Navega para a página de login após o sucesso
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'An error occurred during login';
        // Exibir Toast com a mensagem de erro
        toast.error(errorMessage);
        dispatch({
            type: 'SIGNUP_FAIL'
        });
    }
};

export const login = (email, password, navigate) => async dispatch => {
    try {
        const res = await axios.post('http://localhost:9000/auth/login', { email, password });

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        });

        //console.log(res.data.token);

        dispatch(loadUser());

        navigate('/dashboard');
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'An error occurred during login';
        // Exibir Toast com a mensagem de erro
        toast.error(errorMessage);

        dispatch({
            type: 'LOGIN_FAIL'
        });
    }
};

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:9000/auth/users');

        dispatch({
            type: 'USER_LOADED',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: 'AUTH_ERROR'
        });
    }
};

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};
