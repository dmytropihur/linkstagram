import { useSelector } from 'react-redux';

import selectUser from '@/core/store/user/selectors';
import { Post } from '@/core/typings/post';

import Avatar from '../avatar';

import styles from './author.module.scss';

type AuthorProps = {
  post: Post;
};

const Author: React.FC<AuthorProps> = ({ post }) => {
  const { user } = useSelector(selectUser);
  const isMyPost = user?.username === post.author.username;

  return (
    <div className={styles.root}>
      <Avatar
        size="sm"
        src={isMyPost ? user.profile_photo_url : post.author.profile_photo_url}
      />
      <div className={styles.info}>
        <span className={styles.name}>{post.author.username}</span>
        <span className={styles.time}>{post.created_at}</span>
      </div>
    </div>
  );
};

export default Author;
