// eslint-disable-next-line import/prefer-default-export
import * as Yup from 'yup';

export const BASE_API_URL = 'https://linkstagram-api.linkupst.com';
export const EMAIL_FIELD_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');
