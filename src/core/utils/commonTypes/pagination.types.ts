export type PaginationRequest = {
  page: number;
  perPage: number;
};

export type PaginationInput = {
  take: number;
  skip: number;
  page: number;
};

export type GetPaginateResponse<T> = Promise<{
  pagination: {
    page: number;
    next: boolean;
    previous: boolean;
    hasMore: boolean;
    totalPages: number;
  };
  data: T;
  count: number;
}>;
