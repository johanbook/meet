import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export const BinaryFileArray = () => {
  return applyDecorators(
    ApiProperty({
      type: "array",
      items: {
        format: "binary",
        type: "string",
      },
    }),
  );
};
