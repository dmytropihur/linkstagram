import setUserToLS from '../utils/set-user-to-ls';

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
