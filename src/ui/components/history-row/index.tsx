import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store';
import selectProfiles from '@/core/store/profiles/selectors';
import { fetchProfiles } from '@/core/store/profiles/slice';
import useWindowSize from '@/ui/hooks/use-get-window-size';

import Avatar from '../avatar';

import styles from './history-row.module.scss';

const History: React.FC = () => {
  const { profiles } = useSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  return (
    <div className={styles.mask}>
      <ul className={styles.list}>
        {profiles?.map((item) => (
          <li key={item.username} className={styles.item}>
            <Avatar
              size={windowSize.width < 1024 ? 'sm' : 'md'}
              src={item.profile_photo_url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
