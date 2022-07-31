import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import { useAppDispatch } from '@/core/store';
import selectPosts from '@/core/store/posts/selectors';
import { fetchPosts } from '@/core/store/posts/slice';
import History from '@/ui/components/history-row';
import Post from '@/ui/components/post';

import styles from './home.module.scss';

const HomePage: React.FC = () => {
  const { ref, inView } = useInView();
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
    <div className={styles.container}>
      <History />
      <ul className={styles['post-list']}>
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
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
  );
};

export default HomePage;
