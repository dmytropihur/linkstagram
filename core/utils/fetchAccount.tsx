import axios from 'axios';

import { BASE_API_URL } from '../config/constants';

import setUserToLS from './setUserToLS';

const fetchAccount = async (token: string) => {
  const { data } = await axios.get(`${BASE_API_URL}/account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setUserToLS(data);

  return data;
};

export default fetchAccount;
