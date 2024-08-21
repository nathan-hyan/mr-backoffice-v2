import ga4 from 'react-ga4';
import { BrowserRouter } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react';
import vitest from 'vitest';

import { GACategories, GATypes } from '~constants/gaTagTypes';
import useGATag from '~hooks/useGATag';

vi.mock('react-ga4');

const mockedEvent = vi.fn();

describe('Google Analytics tag', () => {
  window.history.pushState({}, 'Test page', '/');

  it('calls tagAction as expected', () => {
    (ga4.event as vitest.MockedFunction<typeof ga4.event>).mockImplementation(
      mockedEvent
    );

    const { result } = renderHook(useGATag, { wrapper: BrowserRouter });

    act(() => {
      result.current.tagAction(
        GACategories.Brand,
        GATypes.CreateProduct,
        'Test!'
      );
    });

    expect(mockedEvent).toHaveBeenCalledWith({
      category: GACategories.Brand,
      action: `${GATypes.CreateProduct} - Test!`,
    });
  });

  it('calls tagError as expected', () => {
    (ga4.event as vitest.MockedFunction<typeof ga4.event>).mockImplementation(
      mockedEvent
    );

    const { result } = renderHook(useGATag, { wrapper: BrowserRouter });

    act(() => {
      result.current.tagError(GATypes.Error, 'There was an error!');
    });

    expect(mockedEvent).toHaveBeenCalledWith({
      category: 'Error',
      action: `Error - ${GATypes.Error}`,
      label: 'There was an error!',
    });
  });
});
