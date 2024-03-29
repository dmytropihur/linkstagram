import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import { RootState, useAppDispatch } from '@/core/store';
import { deletePost, fetchPosts } from '@/core/store/posts/slice';
import selectUser from '@/core/store/user/selectors';
import Button from '@/ui/components/button';
import Confirm from '@/ui/components/confirm-alert';
import Edit from '@/ui/components/edit-profile';
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useSelector(selectUser);

  const { ref, inView } = useInView();
  const { posts, status, totalQuantity } = useSelector(
    (state: RootState) => state.posts,
  );

  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(2);

  const list = useMemo(
    () =>
      posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          setDeletedPostId={setDeletedPostId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )),
    [posts],
  );

  const onDeleteConfirmHandler = () => {
    dispatch(deletePost(deletedPostId));
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
          <ul className={styles['post-list']}>{list}</ul>
          {status === 'pending' && (
            <div className={styles.loader}>
              <SyncLoader />
            </div>
          )}
          {status === 'fulfilled' && posts.length < totalQuantity && (
            <div className={styles.bottom} ref={ref} />
          )}
        </div>
        {user && (
          <Card
            onNewPost={() => setIsCreateModalOpen(true)}
            onEditProfile={() => setIsEditModalOpen(true)}
          />
        )}
      </div>
      <Modal
        className={styles['create-modal']}
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <NewPost
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
        />
      </Modal>
      <Modal
        className={styles['delete-modal']}
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
      <Modal
        className={styles['edit-modal']}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <Edit onCancel={() => setIsEditModalOpen(false)} />
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
