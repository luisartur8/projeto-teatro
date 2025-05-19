import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ApplicationDateValidators {

  static dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const [dia, mes, ano] = value.split('/');

    const currentYear = new Date().getFullYear();
    const isValid =
      dia >= 1 && dia <= 31 &&
      mes >= 1 && mes <= 12 &&
      ano >= 1900 && ano <= currentYear &&
      value.length === 10; // "xx/xx/xxxx"

    return isValid ? null : { invalidDate: true }
  }
}