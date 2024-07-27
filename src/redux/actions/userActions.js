import api from '../../utils/api';

export const getUsers = () => async dispatch => {
    try {
        const res = await api.get('auth/users');

        dispatch({
            type: 'GET_USERS',
            payload: res.data
        });

        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};

// http://localhost:9000/storage/display/carlos.jpg
// Ação para obter imagem de perfil com parâmetro
export const getProfilePicture = (url) => async dispatch => {
    try {
        const res = await api.get(url); // Usando a URL dinâmica

        dispatch({
            type: 'GET_PROFILE_PICTURE',
            payload: res.data
        });

        console.log(res.data)
    } catch (err) {
        console.error(err);
    }
};
