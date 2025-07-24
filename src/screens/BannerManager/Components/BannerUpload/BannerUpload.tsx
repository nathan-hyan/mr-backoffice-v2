import { Button, Typography } from '@mui/material';
import { Nullable } from 'vite-env';

import CircularProgressWithLabel from '~components/CircularProgressWithLabel';

interface Props {
  isUploading: boolean;
  uploadProgress: Nullable<number>;
  handleFileUpload: React.ChangeEventHandler<HTMLInputElement>;
  inputId: string;
  label?: string;
}

function BannerImageUploader({
  isUploading,
  uploadProgress,
  handleFileUpload,
  inputId,
  label = '',
}: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <Typography variant='body2' fontWeight='bold'>
          {label}
        </Typography>
      )}

      <label
        htmlFor={inputId}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          variant='contained'
          component='span'
          fullWidth={false}
          disabled={isUploading}
          startIcon={
            uploadProgress !== null && isUploading ? (
              <CircularProgressWithLabel
                color='primary'
                value={uploadProgress}
              />
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
          id={inputId}
          hidden
          accept='image/*'
          type='file'
          title='actual-input'
          multiple
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}

export default BannerImageUploader;
