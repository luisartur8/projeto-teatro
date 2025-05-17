import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ApplicationEmailValidators {

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    let email = control.value;

    // Regex: Remove espaços extras
    email = email.trim().toLowerCase().replace(/\s+/g, " ");

    // Permite apenas um '@'
    if (email.indexOf('@') != email.lastIndexOf('@')) {
        return { invalidEmail: true }
    }

    // Detecta se o e-mail começa ou termina com "@"
    if (!(email.indexOf('@') > 0 && email.indexOf('@') < email.length - 1)) {
        return { invalidEmail: true }
    }

    // Validação de comprimento (até 254 caracteres)
    if (email.length > 254 || email.length < 4) {
        return { invalidEmail: true }
    }

    // Regex e-mail pattern
    const EMAIL_PATTERN = /^(?!.*__)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?<!-)\.[a-zA-Z]{2,}$/i;
    const matcher = EMAIL_PATTERN.test(email);

    if (!matcher) {
        return { invalidEmail: true }
    }

    return null;
  }
}