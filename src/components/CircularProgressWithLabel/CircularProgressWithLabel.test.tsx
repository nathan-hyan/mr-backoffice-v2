import { render, screen } from '@testing-library/react';

import CircularProgressWithLabel from '~components/CircularProgressWithLabel';

describe('CircularProgressWithLabel', () => {
  it('renders as expected', () => {
    render(<CircularProgressWithLabel value={100} />);

    const progress = screen.getByTitle('progress');

    expect(progress).toHaveTextContent('100');
  });

  it('renders with correct value', () => {
    render(<CircularProgressWithLabel value={50} />);
    const progress = screen.getByTitle('progress');
    expect(progress).toHaveTextContent('50');
  });

  it('renders with correct variant', () => {
    render(<CircularProgressWithLabel value={75} variant='indeterminate' />);
    const progress = screen.getByTitle('progress');
    expect(progress).toHaveTextContent('75');
  });
});
