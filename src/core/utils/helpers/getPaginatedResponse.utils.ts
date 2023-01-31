export const getPaginatedResponse = <T>(args: {
  data: T;
  total: number;
  take: number;
  page: number;
}) => {
  const { data, page, take, total } = args;
  const totalPages = Math.ceil(total / take);
  return {
    count: total,
    data,
    pagination: {
      page,
      totalPages,
      previous: page > 1,
      next: totalPages > page,
      hasMore: totalPages > page,
    },
  };
};
