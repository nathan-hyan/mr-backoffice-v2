import { render, screen, waitFor } from '@testing-library/react';
import { File } from 'buffer';
import { blob, buffer } from 'stream/consumers';

import { renderWithRouter } from '~config/renderWithRouter';

import ImageUploader from './ImageUploader';

describe('<ImageUploader />', () => {
  it('renders correctly', () => {
    render(
      <ImageUploader
        handleFileUpload={vi.fn()}
        isUploading={false}
        uploadProgress={0}
      />
    );
    const button = screen.getByRole('button', { name: 'Subir imágenes' });
    const imageInput = screen.getByTitle('actual-input');

    expect(button).toBeInTheDocument();
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).not.toBeVisible();
  });

  // TODO: Finish it when documentation is available
  //   it('calls function when clicked on button', async () => {
  //     const mockOnChange = vi.fn();

  //     const { user } = renderWithRouter(
  //       <ImageUploader
  //         handleFileUpload={mockOnChange}
  //         isUploading={false}
  //         uploadProgress={0}
  //       />
  //     );

  //     const imageInput = screen.getByTitle('actual-input');

  //     expect(imageInput).toBeInTheDocument();

  //     await user.upload(imageInput, new File([], 'filename'));

  //     await waitFor(() => expect(mockOnChange).toHaveBeenCalled());
  //   });

  it('disables button when prop is passed', () => {
    render(
      <ImageUploader
        handleFileUpload={vi.fn()}
        isUploading
        uploadProgress={15}
      />
    );
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
