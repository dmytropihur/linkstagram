import { Status, Profile } from '../types';

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
