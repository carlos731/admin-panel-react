import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

const rootReducer = {
    auth: authReducer,
    users: userReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;