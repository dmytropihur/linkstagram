import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import selectUser from '@/core/store/user/selectors';
import { Post as PostProp } from '@/core/typings/post';

import AuthorBtn from '../../../../public/images/author-button.svg';
import undefinedPicture from '../../../../public/images/post-undefined-picture.png';
import Author from '../author';
import Interactions from '../post-interactions';

import styles from './post.module.scss';

type PostProps = {
  post: PostProp;
  setDeletedPostId: (id: number) => void;
  setIsDeleteModalOpen: (arg: boolean) => void;
};

// eslint-disable-next-line react/display-name
const Post = React.forwardRef<HTMLLIElement, PostProps>((props, ref) => {
  const { post, setIsDeleteModalOpen, setDeletedPostId } = props;
  const { user } = useSelector(selectUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMyPost = user?.username === post.author.username;

  const onDeleteHandler = () => {
    setIsDropdownOpen(false);
    setIsDeleteModalOpen(true);
    setDeletedPostId(post.id);
  };

  return (
    <li className={styles.wrapper} ref={ref}>
      <div className={styles.top}>
        <div className={styles['author-wrapper']}>
          <Author post={post} />
          {isMyPost && (
            <AuthorBtn
              className={styles['author-btn']}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
          )}
          {isDropdownOpen && (
            <ul className={styles['drop-list']}>
              <li className={styles['drop-item']}>
                <button
                  className={styles['drop-button']}
                  type="button"
                  onClick={onDeleteHandler}
                >
                  Delete post
                </button>
              </li>
            </ul>
          )}
        </div>
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
