import request from "./request";


export const getApplicationList = () => request.get('/application/getApplicationList', {})


export const createApplication = (data) => request.post('/application/registerApplication', data)


export const getApplicationName = (id) => request.get('/application/getApplicationName', { id })

export const allowAuth = (appid) => request.post('/application/allowAuth', { appid })
