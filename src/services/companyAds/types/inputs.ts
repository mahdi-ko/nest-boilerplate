export type CreateCompanyAddInput = {
  name: string;
  website: string;
  imagePath: string;
  active?: boolean;
};

export type UpdateCompanyAddInput = {
  name?: string;
  website?: string;
  imagePath?: string;
  active?: boolean;
};
