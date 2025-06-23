import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ApplicationUrlValidators {
  static urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;


    if (!value || value.trim() === '') {
      return null;
    }


    if (value.startsWith('http://') || value.startsWith('https://')) {
      return null;
    }


    return { invalidUrl: true };
  }
}
