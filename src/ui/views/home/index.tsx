import History from '@/ui/components/history-row';

import styles from './home.module.scss';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <History />
    </div>
  );
};

export default HomePage;
