import { render, screen } from '@testing-library/react';

import CustomListItem from './CustomListItem';

describe('CustomListItem', () => {
  it('renders with title and value', () => {
    render(<CustomListItem title='Title' value='Value' />);
    const titleElement = screen.getByText('Title');
    const valueElement = screen.getByText('Value');
    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  it('renders with custom width', () => {
    render(<CustomListItem title='Title' value='Value' width='200px' />);
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveStyle({ width: '200px' });
  });
});
