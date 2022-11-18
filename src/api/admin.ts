import { Role, VerifyStatus } from "@/constrant/enum";
import request from "./request";
export const testAdmin = () => request.get('/admin/test', {})

export const getAccountList = (page, size = 10) => request.get('/admin/getAccountList', { page, size })

export const verifyAccount = (id: string, verify_status: VerifyStatus) =>
  request.post('/admin/verifyAccount', { id, verify_status })

export const updatePasswordById = (id: string, password: string) =>
  request.post('/admin/updateAccountPassword', { id, password })

export const updateRole = (id: string, role: Role) =>
  request.post('/admin/updateAccountRole', { id, role })
