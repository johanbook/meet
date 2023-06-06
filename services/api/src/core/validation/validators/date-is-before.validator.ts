import {
  registerDecorator,
  ValidationOptions,
} from "class-validator";

interface DateIsBeforeProps {
  years?: number;
}

export function DateIsBefore(
  property: DateIsBeforeProps,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "dateIsBefore",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const targetDate = new Date();

          const { years } = property;

          if (!(value instanceof Date)) {
            return false;
          }

          if (years) {
            const targetYear = targetDate.getFullYear() - years;
            targetDate.setFullYear(targetYear);
          }

          return value <= targetDate;
        },
      },
    });
  };
}
