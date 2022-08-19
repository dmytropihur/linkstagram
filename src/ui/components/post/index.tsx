import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store';
import { deletePost } from '@/core/store/posts/slice';
import selectUser from '@/core/store/user/selectors';
import { Post as PostProp } from '@/core/typings/post';

import AuthorBtn from '../../../../public/images/author-button.svg';
import undefinedPicture from '../../../../public/images/post-undefined-picture.png';
import Author from '../author';
import Confirm from '../confirm-alert';
import Modal from '../modal';
import Interactions from '../post-interactions';

import styles from './post.module.scss';

type PostProps = {
  post: PostProp;
};

// eslint-disable-next-line react/display-name
const Post = React.forwardRef<HTMLLIElement, PostProps>((props, ref) => {
  const { post } = props;
  const { user } = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();

  const onDeleteHandler = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(false);

    if (!isConfirmed) return;

    dispatch(deletePost(post.id));
  }, [isConfirmed]);

  useEffect(() => {
    if (user?.username === post.author.username) {
      setIsMyPost(true);
    }
  }, []);

  return (
    <>
      <li className={styles.wrapper} ref={ref}>
        <div className={styles.top}>
          <div className={styles['author-wrapper']}>
            <Author post={post} />
            <AuthorBtn
              className={styles['author-btn']}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {isDropdownOpen && (
              <ul className={styles['drop-list']}>
                {isMyPost && (
                  <li className={styles['drop-item']}>
                    <button
                      className={styles['drop-button']}
                      type="button"
                      onClick={onDeleteHandler}
                    >
                      Delete post
                    </button>
                  </li>
                )}
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
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Confirm
          onConfirm={() => setIsConfirmed(true)}
          onCancel={() => setIsModalOpen(false)}
        >
          Are you sure you want to delete this post?
        </Confirm>
      </Modal>
    </>
  );
});

export default Post;
