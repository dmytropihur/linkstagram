import { Post } from '@/core/typings/post';

import AuthorBtn from '../../../../public/images/author-button.svg';
import Avatar from '../avatar';

import styles from './author.module.scss';

type AuthorProps = {
  post: Post;
};

const Author: React.FC<AuthorProps> = ({ post }) => {
  return (
    <div className={styles.root}>
      <div className={styles['author-wrapper']}>
        <Avatar size="sm" src={post.author.profile_photo_url} />
        <div className={styles.info}>
          <span className={styles.name}>{post.author.first_name}</span>
          <span className={styles.name}>{post.author.last_name}</span>
          <span className={styles.time}>{post.created_at}</span>
        </div>
      </div>
      <AuthorBtn className={styles['author-btn']} />
    </div>
  );
};

export default Author;
