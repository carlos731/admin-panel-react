const initialState = {
    users: [],
    profilePicture: null,
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case 'GET_PROFILE_PICTURE':
            return {
                ...state,
                profilePicture: action.payload,
                loading: false
            };
        case 'GET_USERS_REQUEST':
        case 'GET_PROFILE_PICTURE_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'GET_USERS_FAIL':
        case 'GET_PROFILE_PICTURE_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;
