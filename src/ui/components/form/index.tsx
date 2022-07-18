/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Link from 'next/link';

import ROUTES from '@/core/config/routes';
import { AuthProps } from '@/core/store/user/types';

import Button from '../button';
import Error from '../error';

import styles from './form.module.scss';

type FormProps = {
  type: string;
  initialValues: {
    login: string;
    password: string;
    username?: string;
  };
  handleSubmit: (values: AuthProps) => void;
  schema: object;
};

const Form: React.FC<FormProps> = ({
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
      {({ isValid }) => (
        <FormikForm className={styles.form}>
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
                <Link href={ROUTES.register}>
                  <a className={styles.link}>Sign Up</a>
                </Link>
              )}
              {type === 'Sign Up' && (
                <Link href={ROUTES.login}>
                  <a className={styles.link}>Log In</a>
                </Link>
              )}
            </span>
            <Button variant="accent" type="submit" disabled={!isValid}>
              {type}
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
