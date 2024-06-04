import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Correggi qui styleUrls
})
export class LoginComponent {

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      alert("login effettuato con successo")
      form.reset();

    } else {
      console.log('Form non valido');
    }
  }
}
