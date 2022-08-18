import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import { useAppDispatch } from '@/core/store';
import selectPosts from '@/core/store/posts/selectors';
import { fetchPosts } from '@/core/store/posts/slice';
import selectUser from '@/core/store/user/selectors';
import History from '@/ui/components/history-row';
import Modal from '@/ui/components/modal';
import NewPost from '@/ui/components/new-post';
import Post from '@/ui/components/post';

import styles from './home.module.scss';

const Card = dynamic(() => import('@/ui/components/profile-card'), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { ref, inView } = useInView();
  const { user } = useSelector(selectUser);
  const { posts, status, totalQuantity } = useSelector(selectPosts);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(2);

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
      {status === 'pending' && (
        <div className={styles.loader}>
          <SyncLoader />
        </div>
      )}

      {status !== 'pending' && (
        <div className={styles.container}>
          <div className={styles['posts-column']}>
            <History />
            <ul className={styles['post-list']}>
              {posts.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
            </ul>
            {status === 'fulfilled' && posts.length < totalQuantity && (
              <div className={styles.bottom} ref={ref} />
            )}
          </div>
          {user && <Card onNewPost={() => setIsModalOpen(true)} />}
        </div>
      )}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPost setIsOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default HomePage;
