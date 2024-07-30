import { useState } from 'react';

function useModal() {
  const [showModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
  };

  return [showModal, toggleModal] as const;
}
export default useModal;
