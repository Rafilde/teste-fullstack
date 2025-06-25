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

  senhaMinima = false;
  senhaMaiuscula = false;
  senhaMinuscula = false;
  senhaNumero = false;
  senhaEspecial = false;

  senhaValida = false;
  confirmaSenhaValida = true;

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.resetFields();
  }

  resetFields() {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.senhaValida = false;
    this.confirmaSenhaValida = true;
  }

  validarSenha() {
    const senha = this.senha || '';
    this.senhaMinima = senha.length >= 8;
    this.senhaMaiuscula = /[A-Z]/.test(senha);
    this.senhaMinuscula = /[a-z]/.test(senha);
    this.senhaNumero = /[0-9]/.test(senha);
    this.senhaEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    this.senhaValida =
      this.senhaMinima &&
      this.senhaMaiuscula &&
      this.senhaMinuscula &&
      this.senhaNumero &&
      this.senhaEspecial;

    this.validarConfirmarSenha();
  }

  validarConfirmarSenha() {
    this.confirmaSenhaValida = this.senha === this.confirmarSenha;
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
    if (!this.email || !this.senha) {
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
      password: this.senha,
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
    if (!this.nome || !this.email || !this.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (!emailValido) {
      alert('Por favor, insira um email válido.');
      return;
    }

    const userData: User = {
      name: this.nome,
      email: this.email,
      password: this.senha,
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
