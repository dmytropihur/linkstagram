import { useSelector } from 'react-redux';

import selectUser from '@/core/store/user/selectors';

import Avatar from '../avatar';
import Button from '../button';

import styles from './profile-card.module.scss';

type CardProps = {
  onNewPost: () => void;
  onEditProfile?: () => void;
};

const Card: React.FC<CardProps> = ({ onNewPost }) => {
  const { user } = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <div className={styles.fixed}>
        <div className={styles['info-wrapper']}>
          <div className={styles.popularity}>
            <span className={styles.num}>{user?.followers}</span>
            <span className={styles.title}>Followers</span>
          </div>
          <Avatar gradient size="lg" src={user?.profile_photo_url} />
          <div className={styles.popularity}>
            <span className={styles.num}>{user?.following}</span>
            <span className={styles.title}>Following</span>
          </div>
        </div>
        <div className={styles['personal-wrapper']}>
          <span>{`${user?.first_name} ${user?.last_name}`}</span>
          <span>-</span>
          <span>{user?.job_title}</span>
        </div>
        <p className={styles.description}>{user?.description}</p>
        <div className={styles['buttons-wrapper']}>
          <Button className={styles.button} variant="regular">
            Edit profile
          </Button>
          <Button
            className={styles.button}
            variant="accent"
            onClick={onNewPost}
          >
            New post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
