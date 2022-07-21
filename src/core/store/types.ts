export type Status = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export type Profile = {
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
