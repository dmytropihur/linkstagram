import { Post } from '@/core/typings/post';
import { Status } from '@/core/typings/redux';

export interface PostsSliceState {
  error: string | null;
  posts: Post[];
  status: Status;
  totalQuantity: number;
}
