import { screen } from '@testing-library/react';

import { renderWithRouter } from '~config/renderWithRouter';

import App from './App';

describe('<App />', () => {
  it('renders correctly', () => {
    renderWithRouter(<App />);

    const CTA = screen.getByRole('button', {
      name: 'Iniciar sesion con Google',
    });

    expect(CTA).toBeInTheDocument();
  });
});
