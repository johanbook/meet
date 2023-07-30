import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiBodyOptions, ApiConsumes } from "@nestjs/swagger";

export function Multipart(options: ApiBodyOptions) {
  return applyDecorators(ApiConsumes("multipart/form-data"), ApiBody(options));
}
