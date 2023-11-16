import { useState } from 'react';
import { Nullable } from 'vite-env';

function useMenu() {
  const [anchorElement, setAnchorElement] =
    useState<Nullable<HTMLElement>>(null);

  const open = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const close = () => {
    setAnchorElement(null);
  };

  return { open, close, anchorElement };
}
export default useMenu;
