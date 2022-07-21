import { Profile } from '../store/types';

const setUserToLS = (object: Profile) => {
  localStorage.setItem('user', JSON.stringify(object));
};

export default setUserToLS;
