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
    <label
      htmlFor='upload-image'
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Button
        variant='contained'
        component='span'
        id='upload-button'
        fullWidth={false}
        disabled={isUploading}
        startIcon={
          uploadProgress !== null && isUploading ? (
            <CircularProgressWithLabel color='primary' value={uploadProgress} />
          ) : null
        }
        sx={{
          width: 180,
          height: 40,
          backgroundColor: '#fff',
          color: '#8251ED',
          border: '1px solid #8251ED',
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#8251ED',
            color: '#fff',
          },
        }}
      >
        Subir imagen
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
