import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    this.appService.login(email, password).subscribe({
      next: (user) => {
        let token = btoa(JSON.stringify({ token: user[0].id }));
        sessionStorage.setItem('token', token);
        this.router.navigate(['main/cobranzas']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: err,
        });
      },
    });
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.appService.email)],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  fieldValid(field: string) {
    let param = this.loginForm.get(`${field}`)!;
    return param.errors && param.touched;
  }

  get emailErrors(): string {
    const errors = this.loginForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'El correo es obligatorio';
    } else if (errors?.['pattern']) {
      return 'Formato de correo no válido';
    }
    return 'Correo inválido';
  }
}
