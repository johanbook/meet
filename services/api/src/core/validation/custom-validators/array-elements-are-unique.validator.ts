import { ValidationOptions, registerDecorator } from "class-validator";

export function UniqueArrayElements(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "uniqueArrayElements",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        defaultMessage: () => {
          return `Array elements must be unique`;
        },
        validate(data: unknown) {
          if (!Array.isArray(data)) {
            return false;
          }

          const distinct = new Set(data);
          return distinct.size === data.length;
        },
      },
    });
  };
}
