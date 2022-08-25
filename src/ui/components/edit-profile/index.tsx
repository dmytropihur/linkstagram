import AwsS3 from '@uppy/aws-s3';
import Uppy, { UppyFile } from '@uppy/core';
import { FormikProps, useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { BASE_API_URL } from '@/core/config/constants';
import { useAppDispatch } from '@/core/store';
import selectUser from '@/core/store/user/selectors';
import { editProfile } from '@/core/store/user/slice';
import useWindowSize from '@/ui/hooks/use-get-window-size';

import EditView from './view';

type EditProps = {
  onCancel: () => void;
};

export type FormikValues = {
  username?: string;
  description?: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
};

const Edit: React.FC<EditProps> = ({ onCancel }) => {
  const { user, status } = useSelector(selectUser);
  const size = useWindowSize();
  const [photoPreview, setPhotoPreview] = useState('');
  const [chosenPhotoData, setChosenPhotoData] = useState<UppyFile | null>(null);
  const dispatch = useAppDispatch();

  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
    },
  });

  uppy.use(AwsS3, {
    companionUrl: `${BASE_API_URL}`,
  });

  uppy.on('upload-success', (data) => {
    setChosenPhotoData(data);
  });

  const submitEditing = async (values: FormikValues) => {
    await dispatch(
      editProfile({
        account: {
          username: values.username,
          description: values.description,
          first_name: values.first_name,
          last_name: values.last_name,
          job_title: values.job_title,
          profile_photo: chosenPhotoData
            ? {
                id: String(chosenPhotoData?.meta.key).slice(6),
                storage: 'cache',
                metadata: {
                  filename: chosenPhotoData.name,
                  size: chosenPhotoData.size,
                  mime_type: chosenPhotoData.type as string,
                },
              }
            : null,
        },
      }),
    );
    document.body.style.overflow = '';
    onCancel();
  };

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
          toast(err, { type: 'error' });
        } else {
          toast(err, { type: 'error' });
        }
      }
    });
  };

  const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: {
      username: user?.username,
      first_name: user?.first_name,
      last_name: user?.last_name,
      job_title: user?.job_title,
      description: user?.description,
    },
    onSubmit: submitEditing,
  });

  return (
    <EditView
      formik={formik}
      photoPreview={photoPreview}
      user={user}
      status={status}
      onPhotoChange={onPhotoChange}
      size={size}
      onCancel={onCancel}
    />
  );
};

export default Edit;
