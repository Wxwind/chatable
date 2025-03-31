import { registerDecorator, ValidationOptions, ValidationArguments, isPhoneNumber, isEmail } from 'class-validator';

export function IsPhoneOrEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isPhoneOrEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && (isPhoneNumber(value, 'CN') || isEmail(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 必须是合法的手机号或邮箱地址`;
        },
      },
    });
  };
}
