import { ActionFunctionArgs } from 'react-router-dom';

import { flattenToNested } from '~config/configUtils';

export const prepareFormData = async <T extends object>({
  request,
  params,
}: ActionFunctionArgs) => {
  let body: T = {} as T;
  const formData = await request!.formData();

  formData.forEach((value, key) => {
    body = { ...body, [key]: value };
  });

  const flattenedBodyWithId = {
    ...flattenToNested(body),
    id: params ? params.id : undefined,
  } as T;

  return params.id ? flattenedBodyWithId : flattenToNested(body);
};
