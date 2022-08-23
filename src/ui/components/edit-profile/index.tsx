import AwsS3 from '@uppy/aws-s3';
import Uppy, { UppyFile } from '@uppy/core';
import { useFormik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { BASE_API_URL } from '@/core/config/constants';
import selectUser from '@/core/store/user/selectors';
import useWindowSize from '@/ui/hooks/use-get-window-size';

import undefinedUserImg from '../../../../public/images/undefined-user.jpg';
import Button from '../button';

import styles from './edit-profile.module.scss';

type EditProps = {
  onCancel: () => void;
};

const Edit: React.FC<EditProps> = ({ onCancel }) => {
  const { user } = useSelector(selectUser);
  const size = useWindowSize();
  const [photoPreview, setPhotoPreview] = useState('');
  const [chosenPhotoData, setChosenPhotoData] = useState<UppyFile | null>(null);

  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
    },
  });

  uppy.use(AwsS3, {
    companionUrl: `${BASE_API_URL}`,
  });

  const formik = useFormik({
    initialValues: {
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
      job_title: user?.job_title,
      description: user?.description,
    },
    onSubmit: (values) => {
      console.log(chosenPhotoData);

      console.log(values);
    },
  });

  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e?.target?.files as FileList);

    setPhotoPreview(URL.createObjectURL(files[0]));

    files.forEach((file) => {
      try {
        uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (err) {
        if (err.isRestriction) {
          console.log('Restriction error:', err);
        } else {
          console.error(err);
        }
      }
    });
  };

  uppy.on('upload-success', (data) => {
    setChosenPhotoData(data);
  });

  return (
    <form className={styles.root} onSubmit={formik.handleSubmit}>
      <div className={styles['input-wrapper']}>
        <div className={styles['input-inner']}>
          <label className={styles['img-label']} htmlFor="user-avatar">
            <div className={styles['img-wrapper']}>
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  layout="fill"
                  className={styles.img}
                />
              ) : (
                <Image
                  src={user?.profile_photo_url || undefinedUserImg}
                  alt="user-avatar"
                  layout="responsive"
                  className={styles.img}
                />
              )}
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
                name="first_name"
                className={styles.input}
                value={formik.values.first_name}
                type="text"
                onChange={formik.handleChange}
                id="first-name"
              />
            </label>
            <label className={styles.label} htmlFor="second-name">
              Second Name
              <input
                name="last_name"
                className={styles.input}
                value={formik.values.last_name}
                type="text"
                onChange={formik.handleChange}
                id="second-name"
              />
            </label>
          </div>
        </div>
        <label className={styles.label} htmlFor="nickname">
          Nickname
          <input
            name="username"
            className={styles.input}
            value={formik.values.username}
            type="text"
            onChange={formik.handleChange}
            id="nickname"
          />
        </label>
        <label className={styles.label} htmlFor="job-title">
          Job Title
          <input
            name="job_title"
            className={styles.input}
            value={formik.values.job_title}
            type="text"
            onChange={formik.handleChange}
            id="job-title"
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label} htmlFor="description">
          Description
          <ReactTextareaAutosize
            className={styles.input}
            onChange={formik.handleChange}
            id="description"
            minRows={size.width < 580 ? 1 : 2}
            maxRows={2}
            value={formik.values.description}
          />
        </label>
      </div>
      <div className={styles['button-wrapper']}>
        <Button type="submit" variant="accent">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default Edit;
