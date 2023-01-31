export type CreateExperienceInput = {
  title: string;
  industry: string;
  startDate: Date;
  endDate?: Date;
  active: boolean;
};

export type UpdateExperienceInput = {
  title?: string;
  industry?: string;
  startDate?: Date;
  endDate?: Date;
  active?: boolean;
};
