import { Profile } from './profile';

export type Post = {
  id: number;
  author: Profile;
  comments_count: number;
  created_at: string;
  description: string;
  is_liked: boolean;
  likes_count: number;
  photos: [
    {
      id: number;
      url: string;
    },
  ];
};
