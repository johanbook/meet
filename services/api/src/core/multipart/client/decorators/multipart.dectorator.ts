import { applyDecorators } from "@nestjs/common";
import { ApiConsumes } from "@nestjs/swagger";

export function Multipart() {
  return applyDecorators(ApiConsumes("multipart/form-data"));
}
