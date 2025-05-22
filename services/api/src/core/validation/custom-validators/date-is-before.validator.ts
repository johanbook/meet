import { ValidationOptions, registerDecorator } from "class-validator";

interface DateIsBeforeProps {
  years?: number;
}

export function DateIsBefore(
  property: DateIsBeforeProps,
  validationOptions?: ValidationOptions,
) {
  const { years } = property;
  const targetDate = new Date();

  if (years) {
    const targetYear = targetDate.getFullYear() - years;
    targetDate.setFullYear(targetYear);
  }

  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "dateIsBefore",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        defaultMessage: () => {
          return `Must be a valid date at least before ${targetDate}`;
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
