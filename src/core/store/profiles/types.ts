import { Profile } from '@/core/typings/profile';
import { Status } from '@/core/typings/status';

export interface ProfilesSliceState {
  error: string | null;
  profiles: Profile[] | null;
  status: Status;
}
