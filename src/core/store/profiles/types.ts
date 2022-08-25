import { Profile } from '@/core/typings/profile';
import { Status } from '@/core/typings/redux';

export interface ProfilesSliceState {
  error: string | null;
  profiles: Profile[] | null;
  status: Status;
}

export type EditProfile = {
  account: {
    username?: string;
    profile_photo?: {
      id: string;
      storage: string;
      metadata: {
        filename: string;
        size: number;
        mime_type: string;
      };
    } | null;
    description?: string;
    first_name?: string;
    last_name?: string;
    job_title?: string;
  };
};
