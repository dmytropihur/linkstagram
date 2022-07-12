import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { useAppDispatch } from '../../core/store';
import selectUser from '../../core/store/user/selectors';
import { register } from '../../core/store/user/slice';
import { RegisterProps } from '../../core/store/user/types';
import image from '../../public/images/auth.svg';
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
  const { status } = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: RegisterProps) => {
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
