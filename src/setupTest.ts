import '@testing-library/jest-dom';

export const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importActual) => {
  const router = await importActual<typeof import('react-router-dom')>();
  return {
    ...router,
    useNavigate: vi.fn().mockReturnValue(mockNavigate),
  };
});
