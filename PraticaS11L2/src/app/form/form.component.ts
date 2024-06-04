import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  form!: FormGroup;
  generi: string[] = ['Maschio', 'Femmina', 'Altro'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: this.fb.control(null, [Validators.required]),
      cognome: this.fb.control(null),
      email: this.fb.control(null, [
        Validators.required,
        Validators.email
      ]),
      username: this.fb.control(null, [Validators.required]),
      biografia: this.fb.control(null, [Validators.required]),
      genere: this.fb.control('', [Validators.required, this.genereValidator]),
      immagine: this.fb.control(null, [Validators.required]),
      authData: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: this.passwordMatchValidator })
    });
  }

  invia() {
    console.log(this.form.value);
  }

  isTouchedInvalid(fieldName: string) {
    const field = this.form.get(fieldName);
    return !!field?.invalid && !!field?.touched;
  }

  genereValidator(control: FormControl): ValidationErrors | null {
    return control.value === '' ? { required: true } : null;
  }

  isGenereInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field?.hasError('required') && !!field?.touched;
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  passwordsDoNotMatch(): boolean {
    const authDataGroup = this.form.get('authData');
    return !!authDataGroup?.hasError('mismatch') && !!authDataGroup?.dirty;
  }

  getMessage(fieldName: string) {
    return this.form.get(fieldName)?.errors?.['message'];
  }

  isImgInvalid(): boolean {
    const field = this.form.get('immagine');
    return !!field?.invalid && !!field?.touched;
  }
}
