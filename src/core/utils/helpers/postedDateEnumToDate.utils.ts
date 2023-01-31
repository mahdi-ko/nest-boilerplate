import { PostedDateEnum } from '../enums/PostedDate.enum';

export const postedDateEnumToDate = (postedDate: PostedDateEnum) => {
  const date = new Date();
  switch (postedDate) {
    case PostedDateEnum.ANYTIME:
      return new Date(0);
    case PostedDateEnum.PAST_DAY:
      return new Date(date.setDate(date.getDate() - 1));
    case PostedDateEnum.PAST_WEEK:
      return new Date(date.setDate(date.getDate() - 7));
    case PostedDateEnum.PAST_MONTH:
      return new Date(date.setMonth(date.getMonth() - 1));
  }
};
