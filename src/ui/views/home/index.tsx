import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import { RootState, useAppDispatch } from '@/core/store';
// import selectPosts from '@/core/store/posts/selectors';
import { deletePost, fetchPosts } from '@/core/store/posts/slice';
import selectUser from '@/core/store/user/selectors';
import Button from '@/ui/components/button';
import Confirm from '@/ui/components/confirm-alert';
import History from '@/ui/components/history-row';
import Modal from '@/ui/components/modal';
import NewPost from '@/ui/components/new-post';
import Post from '@/ui/components/post';

import AddIcon from '../../../../public/images/add-icon.svg';

import styles from './home.module.scss';

const Card = dynamic(() => import('@/ui/components/profile-card'), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedPostId, setDeletedPostId] = useState(0);
  const { user } = useSelector(selectUser);

  const { ref, inView } = useInView();
  const { posts, status, totalQuantity } = useSelector(
    (state: RootState) => state.posts,
  );

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(2);

  const onDeleteConfirmHandler = () => {
    try {
      dispatch(deletePost(deletedPostId));
    } catch (error) {
      console.error(error);
    }

    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (inView && posts.length < totalQuantity) {
      dispatch(fetchPosts(currentPage));
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, dispatch, inView]);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles['posts-column']}>
          <History />
          <ul className={styles['post-list']}>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                setDeletedPostId={setDeletedPostId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </ul>
          {status === 'pending' && (
            <div className={styles.loader}>
              <SyncLoader />
            </div>
          )}
          {status === 'fulfilled' && posts.length < totalQuantity && (
            <div className={styles.bottom} ref={ref} />
          )}
        </div>
        {user && <Card onNewPost={() => setIsCreateModalOpen(true)} />}
      </div>
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <NewPost setIsOpen={setIsCreateModalOpen} />
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Confirm
          onConfirm={onDeleteConfirmHandler}
          onCancel={() => setIsDeleteModalOpen(false)}
        >
          Are you sure you want to delete this post?
        </Confirm>
      </Modal>
      <Button
        variant="accent"
        className={styles['icon-wrapper']}
        onClick={() => setIsCreateModalOpen(true)}
      >
        <AddIcon className={styles['add-icon']} />
      </Button>
    </>
  );
};

export default HomePage;
