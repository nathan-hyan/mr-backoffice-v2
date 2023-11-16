import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// test utils file
export const renderWithRouter = (
    component: ReactElement,
    { route = '/' } = {}
) => {
    window.history.pushState({}, 'Test page', route);

    return {
        user: userEvent.setup(),
        ...render(component, { wrapper: BrowserRouter }),
    };
};
