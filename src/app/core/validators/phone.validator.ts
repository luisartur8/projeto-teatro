import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validDDDs } from "../utils/validDDD.utils";

export class ApplicationPhoneValidators {

  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    const cleanedPhone = value.replace(/[\s()-]/g, '');

    const ddd = cleanedPhone.substring(0, 2);

    const isValid = validDDDs.includes(ddd) && cleanedPhone.length === 11 && cleanedPhone[2] === '9';

    return isValid ? null : { invalidPhone: true };
  }
}