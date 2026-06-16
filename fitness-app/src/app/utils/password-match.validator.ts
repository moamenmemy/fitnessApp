import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {

    const password = group.get(passwordKey);
    const confirm = group.get(confirmPasswordKey);

    if (!password || !confirm) {
      return null;
    }

    if (
      confirm.errors &&
      !confirm.errors['passwordMismatch']
    ) {
      return null;
    }

    if (password.value !== confirm.value) {

      confirm.setErrors({
        ...(confirm.errors || {}),
        passwordMismatch: true
      });

    } else {

      if (confirm.errors?.['passwordMismatch']) {

        const { passwordMismatch, ...otherErrors } =
          confirm.errors;

        confirm.setErrors(
          Object.keys(otherErrors).length
            ? otherErrors
            : null
        );
      }
    }

    return null;
  };
}