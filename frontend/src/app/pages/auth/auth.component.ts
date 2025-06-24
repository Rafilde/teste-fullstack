import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, DataViewModule],
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

  handleSubmit() {
    if (this.isLogin) {
      if (!this.email || !this.senha) {
        alert('Por favor, preencha email e senha.');
        return;
      }
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      if (!emailValido) {
        alert('Por favor, insira um email válido.');
        return;
      }
      alert('Fazer login com:');
    } else {
      this.validarSenha();
      this.validarConfirmarSenha();

      if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      if (!emailValido) {
        alert('Por favor, insira um email válido.');
        return;
      }

      if (!this.senhaValida) {
        alert('A senha não atende aos requisitos mínimos.');
        return;
      }
      if (!this.confirmaSenhaValida) {
        alert('As senhas não coincidem!');
        return;
      }
      alert('Cadastrar:');
    }
  }
}
