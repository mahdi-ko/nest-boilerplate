import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * pagination function explanation
 * Query parameters used for the below pagination request are
 * @param {number} page number that defines the current page
 * @param {number} perPage number that defines the number of fetched elements per request
 *
 * @usageNotes
 * the '@Pagination' decorator transforms the provided input
 * @param {number} page and  @param {number} perPage into the required pagination params
 *
 * for response type:
 * @see [PaginationResponse] at (src\core\commonTypes\pagination.types)
 */

export const Pagination = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = +request.query.page || 1;

    let perPage = +request.query.perPage;

    perPage = !perPage ? 10 : perPage > 100 ? 100 : perPage;
    return { page, take: perPage, skip: (page - 1) * perPage };
  },
);
