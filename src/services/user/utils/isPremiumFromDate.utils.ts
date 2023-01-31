export const isPremiumFromDate = (start: Date, end: Date) => {
  const now = new Date();
  return start && end && start <= now && end >= now;
};
