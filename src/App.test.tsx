import { screen, waitFor } from '@testing-library/react';

import App from './App';
import { mockNavigate } from './setupTest';

import { renderWithRouter } from '~config/renderWithRouter';

describe('<App />', () => {
    it('renders correctly', () => {
        renderWithRouter(<App />);

        const CTA = screen.getByRole('button', {
            name: 'Inicie sesión para continuar',
        });

        expect(CTA).toBeInTheDocument();
    });

    it('redirects appropiately when clicked on CTA', async () => {
        const { user } = renderWithRouter(<App />, { route: '/' });

        const CTA = screen.getByRole('button', {
            name: 'Inicie sesión para continuar',
        });

        expect(CTA).toBeInTheDocument();

        await user.click(CTA);

        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        );
    });
});
