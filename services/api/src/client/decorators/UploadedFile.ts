import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UploadedFile = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return await request.file();
  },
);
