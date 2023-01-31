import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.getArgByIndex(0).user;
  },
);
