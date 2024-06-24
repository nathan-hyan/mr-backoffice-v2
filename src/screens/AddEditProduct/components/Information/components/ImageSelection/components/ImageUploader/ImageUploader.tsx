import { Button } from '@mui/material';
import { Nullable } from 'vite-env';

import CircularProgressWithLabel from '~components/CircularProgressWithLabel';

interface Props {
  isUploading: boolean;
  uploadProgress: Nullable<number>;
  handleFileUpload: React.ChangeEventHandler<HTMLInputElement>;
}

function ImageUploader({
  isUploading,
  uploadProgress,
  handleFileUpload,
}: Props) {
  return (
    <label htmlFor='upload-image'>
      <Button
        variant='contained'
        component='span'
        id='upload-button'
        fullWidth
        disabled={isUploading}
        startIcon={
          uploadProgress !== null && isUploading ? (
            <CircularProgressWithLabel color='primary' value={uploadProgress} />
          ) : null
        }
      >
        Subir imágenes
      </Button>
      <input
        disabled={isUploading}
        id='upload-image'
        hidden
        accept='image/*'
        type='file'
        title='actual-input'
        multiple
        onChange={handleFileUpload}
      />
    </label>
  );
}
export default ImageUploader;
