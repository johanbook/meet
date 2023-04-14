import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UploadedFile = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return await request.file();
  },
);
