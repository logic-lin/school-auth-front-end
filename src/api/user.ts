import request from "./request";

export const registerUser = (userInfo) => request.post('/user/register', userInfo);

export const loginUser = (account, password) => request.post('/user/login', { account, password });

export const getUserInfo = () => request.get('/user/getUserInfo', {})

export const updateUser = (user) => request.post('/user/update', user);

export const updatePassword = (data) => request.post('/user/updatePassword', data);

