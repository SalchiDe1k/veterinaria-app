import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean {
        // Verificar si cumple con el formato YYYY-MM-DD
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            return false;
        }

        // Validar si es una fecha válida en el calendario
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        return date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day;
    }

    defaultMessage(args: ValidationArguments): string {
        return "La fecha debe ser válida y estar en el formato 'YYYY-MM-DD'.";
    }
}
