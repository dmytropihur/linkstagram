import { useState } from 'react';

import { Post } from '@/core/typings/post';

import AuthorBtn from '../../../../public/images/author-button.svg';
import Avatar from '../avatar';

import styles from './author.module.scss';

type AuthorProps = {
  post: Post;
};

const Author: React.FC<AuthorProps> = ({ post }) => {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles['author-wrapper']}>
        <Avatar size="sm" src={post.author.profile_photo_url} />
        <div className={styles.info}>
          <span className={styles.name}>{post.author.username}</span>
          <span className={styles.time}>{post.created_at}</span>
        </div>
      </div>
      <AuthorBtn
        className={styles['author-btn']}
        onClick={() => setIsListOpen((prev) => !prev)}
      />
      {isListOpen && (
        <ul className={styles['drop-list']}>
          <li className={styles['drop-item']}>Delete</li>
        </ul>
      )}
    </div>
  );
};

export default Author;
