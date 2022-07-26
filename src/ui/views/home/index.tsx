import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store';
import selectPosts from '@/core/store/posts/selectors';
import { fetchPosts } from '@/core/store/posts/slice';
import History from '@/ui/components/history-row';
import Post from '@/ui/components/post';

import styles from './home.module.scss';

const HomePage: React.FC = () => {
  const { posts } = useSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className={styles.container}>
      <History />
      <ul className={styles['post-list']}>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
