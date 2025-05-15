import { ValidationOptions, registerDecorator } from "class-validator";

export function DateNotInTheFuture(validationOptions?: ValidationOptions) {
  const targetDate = new Date();
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "dateNotInTheFuture",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        defaultMessage: () => {
          return `Must be a valid date that is not in the future`;
        },
        validate(date: unknown) {
          if (!(date instanceof Date)) {
            return false;
          }

          return date <= targetDate;
        },
      },
    });
  };
}
