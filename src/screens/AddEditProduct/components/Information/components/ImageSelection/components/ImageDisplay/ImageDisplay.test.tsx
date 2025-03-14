import { render, screen } from '@testing-library/react';

import ImageDisplay from './ImageDisplay';

const mockData = ['one', 'two', 'three'];

describe('<ImageDisplay />', () => {
  it('renders all images in array correctly', () => {
    render(<ImageDisplay data={mockData} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(mockData.length);
  });
});
