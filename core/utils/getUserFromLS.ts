import Status from '../store/types';
import { User } from '../store/user/types';

const getUserFromLS = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : null;

    return {
      status: 'idle' as Status,
      user: user as User,
      registerError: '',
      loginError: '',
    };
  }

  return {
    status: 'idle' as Status,
    user: null,
    registerError: '',
    loginError: '',
  };
};

export default getUserFromLS;
