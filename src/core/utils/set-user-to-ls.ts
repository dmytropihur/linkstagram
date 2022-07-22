import { Profile } from '@/core/typings/profile';

const setUserToLS = (object: Profile) => {
  localStorage.setItem('user', JSON.stringify(object));
};

export default setUserToLS;
