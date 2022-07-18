import axios from 'axios';

import { BASE_API_URL } from '@/core/config/constants';

export default axios.create({
  baseURL: BASE_API_URL,
});
