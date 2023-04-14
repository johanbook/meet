import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const UploadedImage = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const file = await request.file();

    if (!file.mimetype.startsWith("image")) {
      throw new BadRequestException("Invalid file format");
    }

    return file;
  },
);
