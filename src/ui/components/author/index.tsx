import { Post } from '@/core/typings/post';

import Avatar from '../avatar';

import styles from './author.module.scss';

type AuthorProps = {
  post: Post;
};

const Author: React.FC<AuthorProps> = ({ post }) => (
  <div className={styles.root}>
    <Avatar size="sm" src={post.author.profile_photo_url} />
    <div className={styles.info}>
      <span className={styles.name}>{post.author.username}</span>
      <span className={styles.time}>{post.created_at}</span>
    </div>
  </div>
);

export default Author;
