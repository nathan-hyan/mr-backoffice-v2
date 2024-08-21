export interface IAddCategory {
  name: string;
  internalId?: number;
  subCategories?: {
    name: '';
    internalId?: number;
  }[];
}

export const defaultCategory: IAddCategory = {
  name: '',
  subCategories: [
    {
      name: '',
    },
  ],
};
