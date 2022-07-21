import { User } from '../store/user/types';

const setUserToLS = (object: User) => {
  localStorage.setItem('user', JSON.stringify(object));
};

export default setUserToLS;
