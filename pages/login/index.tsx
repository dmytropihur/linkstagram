import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAppDispatch } from '../../core/store';
import selectUser from '../../core/store/user/selectors';
import { login } from '../../core/store/user/slice';
import { AuthProps } from '../../core/store/user/types';
import image from '../../public/images/auth.svg';
import Error from '../../ui/components/Error';
import Form from '../../ui/components/Form/Form';
import styles from '../../ui/styles/Login.module.scss';

const initialValues = {
  login: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  login: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const SignIn: NextPage = () => {
  const { status, user, loginError } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: AuthProps) => {
    dispatch(login({ login: values.login, password: values.password }));
  };

  useEffect(() => {
    if (status === 'fulfilled' && user.username) {
      router.push('/');
    }
  }, [status]);

  return (
    <section className={styles.section}>
      <img className={styles.img} src={image.src} alt="" />
      <div className={styles.wrapper}>
        {loginError && (
          <Error>
            <div>{loginError}</div>
          </Error>
        )}
        <h1 className={styles.title}>Log In</h1>
        <Form
          type="Sign In"
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          schema={LoginSchema}
        />
      </div>
    </section>
  );
};

export default SignIn;
