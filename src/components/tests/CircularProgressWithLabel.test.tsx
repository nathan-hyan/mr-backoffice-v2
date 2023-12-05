import { render, screen } from '@testing-library/react';

import CircularProgressWithLabel from '~components/CircularProgressWithLabel';

describe('CircularProgressWithLabel', () => {
  it('renders as expected', () => {
    render(<CircularProgressWithLabel value={100} />);

    const progress = screen.getByTitle('progress');

    expect(progress).toHaveTextContent('100');
  });
});
