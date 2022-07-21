import { Profile, Status } from '../types';

export interface ProfilesSliceState {
  error: string | null;
  profile: Profile | null;
  profiles: Profile[] | null;
  status: Status;
}
