import Status from '../types';

export type AuthProps = {
  username?: string;
  login: string;
  password: string;
};

export type User = {
  username: string;
  description: string;
  email: string;
  first_name: string;
  followers: number;
  following: number;
  job_title: string;
  last_name: string;
  profile_photo_url: string;
};

export interface UserSliceState {
  status: Status;
  user: User;
}
