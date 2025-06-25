import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../shared/models/login-credentials.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, DataViewModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin = true;

  hasMinLength = false;
  hasUppercase = false;
  hasLowercase = false;
  hasNumber = false;
  hasSpecialChar = false;

  isPasswordValid = false;
  isConfirmPasswordValid = true;

  // Form fields
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.resetFields();
  }

  resetFields() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.isPasswordValid = false;
    this.isConfirmPasswordValid = true;
  }

  validarSenha() {
    const senha = this.password || '';
    this.hasMinLength = senha.length >= 8;
    this.hasUppercase = /[A-Z]/.test(senha);
    this.hasLowercase = /[a-z]/.test(senha);
    this.hasNumber = /[0-9]/.test(senha);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    this.isPasswordValid =
      this.hasMinLength &&
      this.hasUppercase &&
      this.hasLowercase &&
      this.hasNumber &&
      this.hasSpecialChar;

    this.validarConfirmarSenha();
  }

  validarConfirmarSenha() {
    this.isConfirmPasswordValid = this.password === this.confirmPassword;
  }

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    if (this.isLogin) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  handleLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, preencha email e senha.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (!emailValido) {
      alert('Por favor, insira um email válido.');
      return;
    }

    const credentials: LoginCredentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login com sucesso!', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Email ou senha inválidos. Por favor, tente novamente.');
      },
    });
  }

  handleRegister() {
    if (!this.name || !this.email || !this.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (!emailValido) {
      alert('Por favor, insira um email válido.');
      return;
    }

    const userData: User = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        alert('Cadastro realizado! Agora você pode fazer o login.');
        this.toggleForm();
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        if (err.status === 409) {
          alert('Este email já está em uso.');
        } else {
          alert('Ocorreu um erro no cadastro. Tente novamente.');
        }
      },
    });
  }
}
