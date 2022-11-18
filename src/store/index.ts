import { Gender, Role, VerifyStatus } from '@/constrant/enum';
import defaultSettings from '../settings.json';

export interface IUserInfo {
  name?: string;
  phone?: string;
  email?: string;
  id_card?: string;
  student_card?: string;
  certificate?: string;
  gender?: Gender;
  verify_status?: VerifyStatus;
  role?: Role;
  permissions: Record<string, string[]>;
}
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: IUserInfo;
  userLoading?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    default:
      return state;
  }
}
