import { Gender } from "./enum";

export const GenderMap = {
  [Gender.Man]: '男',
  [Gender.Female]: '女',
  [Gender.Unknown]: '未知',
}
export const GenderOptions = [
  { label: GenderMap[Gender.Man], value: Gender.Man },
  { label: GenderMap[Gender.Female], value: Gender.Female }
]