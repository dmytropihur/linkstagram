import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import { useAppDispatch } from '@/core/store';
import selectPosts from '@/core/store/posts/selectors';
import { fetchPosts } from '@/core/store/posts/slice';
import selectUser from '@/core/store/user/selectors';
import Button from '@/ui/components/button';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector(selectUser);

  const { ref, inView } = useInView();
  const { posts, status, totalQuantity } = useSelector(selectPosts);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(2);

  const list = useMemo(() => {
    return posts.map((post) => {
      return <Post key={post.id} post={post} />;
    });
  }, [posts]);

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
        {user && <Card onNewPost={() => setIsModalOpen(true)} />}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPost setIsOpen={setIsModalOpen} />
      </Modal>
      <Button
        variant="accent"
        className={styles['icon-wrapper']}
        onClick={() => setIsModalOpen(true)}
      >
        <AddIcon className={styles['add-icon']} />
      </Button>
    </>
  );
};

export default HomePage;
