import AwsS3 from '@uppy/aws-s3';
import Uppy, { UppyFile } from '@uppy/core';
import { Dashboard } from '@uppy/react';
import cn from 'classnames';
import { FormEvent, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { BASE_API_URL } from '@/core/config/constants';
import { useAppDispatch } from '@/core/store';
import { createPost } from '@/core/store/posts/slice';
import Button from '@/ui/components/button';
import useWindowSize from '@/ui/hooks/use-get-window-size';

import styles from './new-post.module.scss';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

type NewPostProps = {
  onClose: () => void;
};

const CreatePost: React.FC<NewPostProps> = ({ onClose }) => {
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const [imageData, setImageData] = useState<UppyFile | null>(null);
  const [description, setDescription] = useState('');
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const size = useWindowSize();
  const dispatch = useAppDispatch();

  const uppy = new Uppy({
    autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
    },
  });

  const onCloseHandler = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const onPublishHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(
      createPost({
        post: {
          description,
          photos_attributes: [
            {
              image: {
                id: String(imageData?.meta.key).slice(6),
                storage: 'cache',
                metadata: {
                  filename: imageData?.name || '',
                  size: imageData?.size || 0,
                  mime_type: imageData?.type as string,
                },
              },
            },
          ],
        },
      }),
    );

    onCloseHandler();
  };

  uppy.use(AwsS3, {
    companionUrl: `${BASE_API_URL}`,
  });

  uppy.on('upload-success', (file) => {
    setPreviewImgUrl(file.preview as string);
    setImageData(file);
    setIsButtonDisable(false);
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onPublishHandler}>
        {previewImgUrl ? (
          <div className={styles.preview}>
            <img className={styles.img} src={previewImgUrl} alt="" />
          </div>
        ) : (
          <Dashboard uppy={uppy} />
        )}

        <div className={styles['form-wrapper']}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles.label}>
            Description
            <ReactTextareaAutosize
              className={styles.input}
              minRows={size.width < 580 ? 1 : 3}
              maxRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className={styles['button-wrapper']}>
            <Button
              className={styles.button}
              type="submit"
              variant="accent"
              disabled={isButtonDisable}
            >
              Publish
            </Button>
            <Button
              className={cn(styles['cancel-button'], styles.button)}
              variant="regular"
              onClick={onCloseHandler}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
