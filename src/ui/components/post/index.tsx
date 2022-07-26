import Image from 'next/image';

import { Post as PostProp } from '@/core/typings/post';

import Author from '../author';
import Interactions from '../post-interactions';

import styles from './post.module.scss';

type PostProps = {
  post: PostProp;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.top}>
        <Author post={post} />
        <Image
          src={post.photos[0].url}
          className={styles.img}
          width={560}
          height={560}
          layout="responsive"
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.description}>{post.description}</p>
        <Interactions post={post} />
      </div>
    </li>
  );
};

export default Post;
