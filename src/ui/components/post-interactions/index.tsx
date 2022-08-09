import cn from 'classnames';
import React from 'react';

import { Post } from '@/core/typings/post';

import CommentIcon from '../../../../public/images/comment-icon.svg';
import HeartIcon from '../../../../public/images/heart-icon.svg';
import RightArrowIcon from '../../../../public/images/right-arrow.svg';

import styles from './post-interactions.module.scss';

type InteractionsProps = {
  post: Post;
};

const Interactions: React.FC<InteractionsProps> = ({ post }) => {
  return (
    <div className={styles.interactions}>
      <div className={styles['interactions-wrapper']}>
        <div className={styles['interaction-wrapper']}>
          <HeartIcon className={cn(styles['interaction-icon'], styles.heart)} />
          <span className={styles['interaction-text']}>{post.likes_count}</span>
        </div>
        <div className={styles['interaction-wrapper']}>
          <CommentIcon
            className={cn(styles['interaction-icon'], styles.comment)}
          />
          <span className={styles['interaction-text']}>
            {post.comments_count}
          </span>
        </div>
      </div>
      <div className={styles['share-wrapper']}>
        <span className={styles.share}>Share</span>
        <RightArrowIcon className={styles.arrow} />
      </div>
    </div>
  );
};

export default Interactions;
