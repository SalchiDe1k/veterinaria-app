import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsValidDateConstraint } from './isValidDateConstraint';

export function IsValidDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidDateConstraint,
        });
    };
}
