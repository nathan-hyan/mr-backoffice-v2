import { FormMethod } from 'react-router-dom';

export const getFormProps = (brandId?: string) => {
  const formProps: {
    method: FormMethod;
    action: string;
  } = {
    method: 'post',
    action: '/brandManager/add',
  };

  if (brandId) {
    formProps.method = 'put';
    formProps.action = `/brandManager/edit/${brandId}`;
  }

  return formProps;
};
