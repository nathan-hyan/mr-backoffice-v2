import { render, screen } from '@testing-library/react';

import ImageDisplay from './ImageDisplay';

const mockData = ['one', 'two', 'three'];

describe('<ImageDisplay />', () => {
  it('renders all images in array correctly', () => {
    render(<ImageDisplay data={mockData} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(mockData.length);
  });

  it('renders message when no images are present in the array', () => {
    render(<ImageDisplay data={[]} />);
    const textMessage = screen.getByText(
      'No hay imagenes subidas, por favor ingrese una imágen'
    );

    expect(textMessage).toBeInTheDocument();
  });
});
