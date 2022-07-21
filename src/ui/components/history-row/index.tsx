import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/core/store';
import selectProfiles from '@/core/store/profiles/selectors';
import { fetchProfiles } from '@/core/store/profiles/slice';
import getWindowSize from '@/core/utils/get-window-size';

import Avatar from '../avatar';

import styles from './history-row.module.scss';

const History: React.FC = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const dispatch = useAppDispatch();
  const { profiles } = useSelector(selectProfiles);

  const handleWindowResize = () => {
    setWindowSize(getWindowSize());
  };

  useEffect(() => {
    dispatch(fetchProfiles());
    setWindowSize(getWindowSize());

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <ul className={styles.list}>
      {profiles &&
        profiles.map((item) => {
          return (
            <li key={item.username} className={styles.item}>
              <Avatar
                size={windowSize && windowSize.innerWidth < 1024 ? 'sm' : 'md'}
                src={item.profile_photo_url}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default History;
