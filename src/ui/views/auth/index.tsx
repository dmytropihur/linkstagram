import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import ROUTES from '@/core/config/routes';
import { EMAIL_FIELD_VALIDATION } from '@/core/config/validation';
import { useAppDispatch } from '@/core/store';
import selectUser from '@/core/store/user/selectors';
import { login, register } from '@/core/store/user/slice';
import { AuthProps } from '@/core/store/user/types';
import Error from '@/ui/components/error';
import Form from '@/ui/components/form';

import image from '../../../../public/images/auth.png';

import styles from './auth.module.scss';

type AuthPageProps = {
  type: 'login' | 'register';
};

const initialLoginValues = {
  login: '',
  password: '',
};

const initialRegisterValues = {
  login: '',
  name: '',
  password: '',
};

const RegisterSchema = Yup.object().shape({
  login: EMAIL_FIELD_VALIDATION,
  username: Yup.string()
    .min(6, 'Too Short!')
    .required('Required')
    .matches(/^[^.]+$/, `Must not contain dots`),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const LoginSchema = Yup.object().shape({
  login: EMAIL_FIELD_VALIDATION,
});

const Auth: React.FC<AuthPageProps> = ({ type }) => {
  const { status, error, user } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: AuthProps) => {
    if (type === 'register') {
      dispatch(
        register({
          username: values.username,
          login: values.login,
          password: values.password,
        }),
      );
    }

    if (type === 'login') {
      dispatch(login({ login: values.login, password: values.password }));
    }
  };

  useEffect(() => {
    if (status === 'fulfilled' && user?.username) {
      router.push(ROUTES.home);
    }

    if (status === 'fulfilled' && !user?.username) {
      router.push(ROUTES.login);
    }
  }, [status]);

  return (
    <section className={styles.section}>
      <div className={styles['img-wrapper']}>
        <Image
          className={styles.img}
          src={image.src}
          alt="Auth page image"
          width={452}
          height={684}
        />
      </div>
      <div className={styles.wrapper}>
        {error && (
          <Error>
            <div>{error}</div>
          </Error>
        )}
        <h1 className={styles.title}>
          {type === 'login' ? 'Log In' : 'Sign Up'}
        </h1>
        <Form
          type={type === 'login' ? 'Sign In' : 'Sign Up'}
          initialValues={
            type === 'login' ? initialLoginValues : initialRegisterValues
          }
          handleSubmit={handleSubmit}
          schema={type === 'login' ? LoginSchema : RegisterSchema}
        />
      </div>
    </section>
  );
};

export default Auth;
