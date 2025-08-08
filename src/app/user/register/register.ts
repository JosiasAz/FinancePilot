import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Navbar } from '../../pages/navbar/navbar';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    Navbar
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  hide = true;
  formRegister = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('')
  });

  constructor(private router: Router) {}

  sendCredentials() {
    const name = this.formRegister.get('name')?.value;
    const email = this.formRegister.get('email')?.value;
    const password = this.formRegister.get('password')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;

    if (!name || !email || !password || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Apenas simula o envio e redireciona para login
    console.log('Cadastro simulado:', { name, email, password });
    alert('Cadastro simulado com sucesso!');
    this.router.navigate(['/login']);
  }
}
