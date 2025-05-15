import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from "@nestjs/common";

export const UploadedImage = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const file = await request.file();

    if (!file.mimetype.startsWith("image")) {
      throw new BadRequestException("Invalid image format");
    }

    return file;
  },
);
