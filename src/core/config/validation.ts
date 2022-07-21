import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const EMAIL_FIELD_VALIDATION = Yup.string()
  .email('Invalid email')
  .required('Required');
