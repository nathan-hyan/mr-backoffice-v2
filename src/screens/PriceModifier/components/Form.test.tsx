import { useForm } from 'react-hook-form';
import { render, renderHook, screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from '~config/renderWithRouter';

import { DEFAULT_VALUES, PriceModifierForm } from '../constants';
import Form from './Form';

describe('<Form />', () => {
  it('renders correctly', () => {
    const { result } = renderHook(() =>
      useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES })
    );

    render(
      <Form
        control={result.current.control}
        disabled={false}
        errors={{}}
        handleCancel={vi.fn()}
      />
    );

    const select = screen.getByRole('combobox');
    const inputs = screen.getAllByRole('spinbutton');

    expect(select).toBeInTheDocument();
    expect(inputs).toHaveLength(4);
  });

  it('disables all inputs when disabled is true', () => {
    const { result } = renderHook(() =>
      useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES })
    );

    render(
      <Form
        control={result.current.control}
        disabled
        errors={{}}
        handleCancel={vi.fn()}
      />
    );

    const select = screen.getByRole('combobox');
    const inputs = screen.getAllByRole('spinbutton');

    expect(select).toHaveAttribute('aria-disabled');
    expect(inputs[0]).toBeDisabled();
    expect(inputs[1]).toBeDisabled();
    expect(inputs[2]).toBeDisabled();
    expect(inputs[3]).toBeDisabled();
  });

  it('calls function when click on cancel', async () => {
    const mockCancel = vi.fn();

    const { result } = renderHook(() =>
      useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES })
    );

    const { user } = renderWithRouter(
      <Form
        control={result.current.control}
        disabled={false}
        errors={{}}
        handleCancel={mockCancel}
      />
    );

    const cancelButton = screen.getByRole('button', {
      name: 'Cancelar y volver',
    });

    await user.click(cancelButton);

    await waitFor(() => expect(mockCancel).toHaveBeenCalled());
  });

  it('calls function when click on submit', async () => {
    const mockSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES })
    );

    const { user } = renderWithRouter(
      <form onSubmit={mockSubmit}>
        <Form
          control={result.current.control}
          disabled={false}
          errors={{}}
          handleCancel={vi.fn()}
        />
      </form>
    );

    const cancelButton = screen.getByRole('button', {
      name: 'Cambiar todos los precios',
    });

    await user.click(cancelButton);

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });

  it('displays errors when present', () => {
    const mockSubmit = vi.fn();

    const { result } = renderHook(() =>
      useForm<PriceModifierForm>({ defaultValues: DEFAULT_VALUES })
    );

    renderWithRouter(
      <form onSubmit={mockSubmit}>
        <Form
          control={result.current.control}
          disabled={false}
          errors={{ type: { message: 'Error!', type: 'min' } }}
          handleCancel={vi.fn()}
        />
      </form>
    );

    const errorMessage = screen.getByTitle('error-message');

    expect(errorMessage).toHaveTextContent('Error!');
  });
});
