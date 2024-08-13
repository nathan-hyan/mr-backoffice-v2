import { useState } from 'react';

function useModal(modal?: string) {
  const [showModal, setModal] = useState(!!modal || false);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };

  return [showModal, toggleModal] as const;
}
export default useModal;
