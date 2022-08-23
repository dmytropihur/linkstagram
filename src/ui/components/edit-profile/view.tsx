import { FormikProps, FormikValues } from 'formik';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Profile } from '@/core/typings/profile';

import undefinedUserImg from '../../../../public/images/undefined-user.jpg';
import Button from '../button';

import styles from './edit-profile.module.scss';
import { Status } from '@/core/typings/redux';

type Props = {
  formik: FormikProps<FormikValues>;
  photoPreview: string;
  user: Profile | null;
  onPhotoChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size: { width: number; height: number };
  onCancel: () => void;
  status: Status;
};

const EditView: React.FC<Props> = ({
  formik,
  photoPreview,
  user,
  onPhotoChange,
  size,
  onCancel,
  status,
}) => {
  return (
    <form className={styles.root} onSubmit={formik.handleSubmit}>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-inner']}>
          <label className={styles['img-label']} htmlFor="user-avatar">
            <div className={styles['img-wrapper']}>
              <Image
                src={
                  photoPreview
                    ? photoPreview
                    : user?.profile_photo_url || undefinedUserImg
                }
                alt="user-avatar"
                layout="fill"
                className={styles.img}
              />
            </div>
            <input
              id="user-avatar"
              className={styles['user-avatar']}
              type="file"
              onChange={onPhotoChange}
            />
          </label>
          <div className={styles['input-innerWrapper']}>
            <label className={styles.label} htmlFor="first-name">
              First Name
              <input
                className={styles.input}
                type="text"
                id="first-name"
                {...formik.getFieldProps('first_name')}
              />
            </label>
            <label className={styles.label} htmlFor="second-name">
              Second Name
              <input
                className={styles.input}
                type="text"
                id="second-name"
                {...formik.getFieldProps('last_name')}
              />
            </label>
          </div>
        </div>
        <label className={styles.label} htmlFor="nickname">
          Nickname
          <input
            className={styles.input}
            type="text"
            id="nickname"
            {...formik.getFieldProps('username')}
          />
        </label>
        <label className={styles.label} htmlFor="job-title">
          Job Title
          <input
            className={styles.input}
            type="text"
            id="job-title"
            {...formik.getFieldProps('job_title')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label} htmlFor="description">
          Description
          <ReactTextareaAutosize
            className={styles.input}
            id="description"
            minRows={size.width < 580 ? 1 : 2}
            maxRows={2}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...formik.getFieldProps('description')}
          />
        </label>
      </div>
      <div className={styles['button-wrapper']}>
        <Button type="submit" variant="accent" disabled={status === 'pending'}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditView;
