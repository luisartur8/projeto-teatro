import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ApplicationDateValidators {

  static dateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    let isValid = false;

    const [dia, mes, ano] = value.split('/');

    if (ano < new Date().getFullYear().toString() && ano >= '1900' && dia <= '31' && mes <= 12) {
      isValid = true;
    }

    return isValid ? null : { invalidDate: true }
  }
}