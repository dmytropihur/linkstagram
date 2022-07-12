/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form as Frm, Field, ErrorMessage } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';

import { LoginProps, RegisterProps } from '../../../core/store/user/types';
import Button from '../Button/Button';
import Error from '../Error';

import styles from './Form.module.scss';

type FormProps = {
  type: string;
  initialValues: {
    login: string;
    password: string;
    username?: string;
  };
  handleSubmit: (values: LoginProps | RegisterProps) => void;
  schema: object;
};

const Form: NextPage<FormProps> = ({
  type,
  initialValues,
  handleSubmit,
  schema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {() => (
        <Frm className={styles.form}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>
              Email
              <Field
                name="login"
                className={styles.input}
                type="email"
                placeholder="example@mail.com"
              />
              <Error>
                <ErrorMessage name="login" />
              </Error>
            </label>
            {type === 'Sign Up' ? (
              <label className={styles.label}>
                User Name
                <Field
                  name="username"
                  className={styles.input}
                  type="text"
                  placeholder="alexexample..."
                />
                <Error>
                  <ErrorMessage name="username" />
                </Error>
              </label>
            ) : null}
            <label className={styles.label}>
              Password
              <Field
                name="password"
                className={styles.input}
                type="password"
                placeholder="Type in..."
              />
              <Error>
                <ErrorMessage name="password" />
              </Error>
            </label>
          </div>
          <div className={styles.buttonWrapper}>
            <span className={styles.linkWrapper}>
              Don&apos;t have an account?
              {type === 'Sign In' && (
                <Link href="/register">
                  <a className={styles.link}>Sign Up</a>
                </Link>
              )}
              {type === 'Sign Up' && (
                <Link href="/login">
                  <a className={styles.link}>Log In</a>
                </Link>
              )}
            </span>
            <Button text={type} type="accent" />
          </div>
        </Frm>
      )}
    </Formik>
  );
};

export default Form;
