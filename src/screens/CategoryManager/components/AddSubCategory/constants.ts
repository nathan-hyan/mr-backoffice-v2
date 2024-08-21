export interface IAddSubCategories {
  subCategories: { name: string }[];
}

export const defaultSubCategories: IAddSubCategories = {
  subCategories: [
    {
      name: '',
    },
  ],
};
