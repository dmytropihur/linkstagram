import { Profile } from '@/core/typings/profile';
import { Status } from '@/core/typings/status';

const getUserFromLS = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : null;

    return {
      status: 'idle' as Status,
      user: user as Profile,
      error: null,
    };
  }

  return {
    status: 'idle' as Status,
    user: null,
    error: null,
  };
};

export default getUserFromLS;
