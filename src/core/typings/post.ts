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

export type NewPost = {
  post: {
    description: string;
    photos_attributes: [
      {
        image: {
          id: string;
          storage: string;
          metadata: {
            filename: string;
            size: number;
            mime_type: string;
          };
        };
      },
    ];
  };
};
