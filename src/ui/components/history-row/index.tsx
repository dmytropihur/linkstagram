import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAppDispatch } from '@/core/store';
import selectProfiles from '@/core/store/profiles/selectors';
import { fetchProfiles } from '@/core/store/profiles/slice';
import useWindowSize from '@/ui/hooks/use-get-window-size';

import Avatar from '../avatar';

import styles from './history-row.module.scss';
import 'swiper/css/pagination';
import 'swiper/css';

const History: React.FC = () => {
  const { profiles } = useSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  return (
    <div className={styles.mask}>
      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        grabCursor
        mousewheel
        modules={[Mousewheel]}
      >
        {profiles?.map((item) => (
          <SwiperSlide key={item.username} className={styles.item}>
            <Avatar
              size={windowSize.width < 1024 ? 'sm' : 'md'}
              src={item.profile_photo_url}
              gradient
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default History;
