import setUserToLS from '../utils/setUserToLS';

import axios from './api/axios';

const fetchAccount = async (token: string) => {
  const { data } = await axios.get(`/account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setUserToLS(data);

  return data;
};

export default fetchAccount;
