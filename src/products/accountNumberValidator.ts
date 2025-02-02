import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
export function IsAccountNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAccountNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let account = value.replace(/\s/g, '');
          // Define la lógica de validación aquí, por ejemplo, un formato de cuenta
          return typeof account === 'string' && /^ES\d{22}$/.test(account); // Tiene ESxx y luego 20 dígitos
        },
        defaultMessage(args: ValidationArguments) {
          return 'El número de cuenta no es válido';
        }
      }
    });
  };
}