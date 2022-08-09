import { Profile } from '@/core/typings/profile';
import { Status } from '@/core/typings/redux';

export type AuthProps = {
  username?: string;
  login: string;
  password: string;
};

export interface UserSliceState {
  error: string | null;
  status: Status;
  user: Profile | null;
}
