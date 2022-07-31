import Image from 'next/image';
import React from 'react';

import { Post as PostProp } from '@/core/typings/post';

import undefinedPicture from '../../../../public/images/post-undefined-picture.png';
import Author from '../author';
import Interactions from '../post-interactions';

import styles from './post.module.scss';

type PostProps = {
  post: PostProp;
};

// eslint-disable-next-line react/display-name
const Post = React.forwardRef<HTMLLIElement, PostProps>((props, ref) => {
  const { post } = props;

  return (
    <li className={styles.wrapper} ref={ref}>
      <div className={styles.top}>
        <Author post={post} />
        <Image
          src={post.photos[0]?.url || undefinedPicture}
          className={styles.img}
          width={560}
          height={560}
          layout="responsive"
          placeholder="blur"
          blurDataURL={
            post.photos[0]?.url ||
            '../../../../public/images/post-undefined-picture.png'
          }
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.description}>{post.description}</p>
        <Interactions post={post} />
      </div>
    </li>
  );
});

export default Post;
