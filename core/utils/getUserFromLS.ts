import Status from '../store/types';
import { User } from '../store/user/types';

const getUserFromLS = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : {};

    return { status: 'idle' as Status, user: user as User };
  }

  return {
    status: 'idle' as Status,
    user: {} as User,
  };
};

export default getUserFromLS;
