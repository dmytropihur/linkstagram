import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAppDispatch } from '../../core/store';
import selectUser from '../../core/store/user/selectors';
import { register } from '../../core/store/user/slice';
import { AuthProps } from '../../core/store/user/types';
import image from '../../public/images/auth.svg';
import Error from '../../ui/components/Error';
import Form from '../../ui/components/Form/Form';
import styles from '../../ui/styles/Login.module.scss';

const initialValues = {
  login: '',
  name: '',
  password: '',
};

const RegisterSchema = Yup.object().shape({
  login: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().min(6, 'Too Short!').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const SignUp: NextPage = () => {
  const { status, registerError } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: AuthProps) => {
    dispatch(
      register({
        username: values.username,
        login: values.login,
        password: values.password,
      }),
    );
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      router.push('/login');
    }
  }, [status]);

  return (
    <section className={styles.section}>
      <img className={styles.img} src={image.src} alt="" />
      <div className={styles.wrapper}>
        {registerError && (
          <Error>
            <div>{registerError}</div>
          </Error>
        )}
        <h1 className={styles.title}>Sign Up</h1>
        <Form
          type="Sign Up"
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          schema={RegisterSchema}
        />
      </div>
    </section>
  );
};

export default SignUp;
