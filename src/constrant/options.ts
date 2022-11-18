import { Gender, Role } from "./enum";

export const GenderMap = {
  [Gender.Man]: '男',
  [Gender.Female]: '女',
  [Gender.Unknown]: '未知',
}
export const GenderOptions = [
  { label: GenderMap[Gender.Man], value: Gender.Man },
  { label: GenderMap[Gender.Female], value: Gender.Female }
]

export const RoleMap = {
  [Role.Admin]: '管理员',
  [Role.Super]: '超管',
  [Role.Normal]: '普通用户'
}

export const RoleOptions = [
  { label: RoleMap[Role.Admin], value: Role.Admin },
  { label: RoleMap[Role.Super], value: Role.Super },
  { label: RoleMap[Role.Normal], value: Role.Normal }
]