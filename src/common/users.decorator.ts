import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUsers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('HI', data, ctx);
    const request = ctx.switchToHttp().getRequest();
    return request.users;
  },
);
