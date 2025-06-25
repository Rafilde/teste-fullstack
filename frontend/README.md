# Interface de Gerenciamento Unimed - Frontend

Esta é a aplicação frontend do projeto de teste para desenvolvedor full-stack. Desenvolvida com Angular, ela consome a API backend para fornecer uma interface de usuário para login, cadastro e gerenciamento de planos e beneficiários.

## 🚀 Tecnologias Utilizadas

- **Angular 17+**: Framework principal para a construção da interface.
- **TypeScript**: Linguagem de programação utilizada.
- **HTML5 & CSS3**: Para a estrutura e estilização das páginas.
- **Angular Router**: Para a navegação entre as páginas da aplicação.
- **Angular Forms**: Para a criação e validação de formulários.
- **Angular HttpClient**: Para a comunicação com a API REST do backend.

## 📋 Funcionalidades Implementadas

- **Interface de Autenticação**:
  - Formulário unificado para **Login** e **Cadastro** de usuários.
  - Validação de campos em tempo real (formato do email, requisitos de senha, etc.).
- **Comunicação com a API**:
  - Um `AuthService` centraliza a lógica de comunicação com os endpoints `/register` e `/login` do backend.
- **Gerenciamento de Token (JWT)**:
  - Após o login, o token JWT recebido é armazenado no `localStorage` do navegador.
  - *(A ser implementado: um `HttpInterceptor` para adicionar o token automaticamente em todas as requisições para rotas protegidas).*
- **Proteção de Rotas (Route Guards)**:
  - Um `AuthGuard` verifica se o usuário está logado (se existe um token) antes de permitir o acesso a rotas protegidas (Dashboard, Planos, Beneficiários).
  - Caso o usuário não esteja logado, ele é automaticamente redirecionado para a página de login.
- **Funcionalidade de Logout**:
  - Remove o token do `localStorage` e redireciona o usuário para a página de login.

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- Node.js e npm instalados.
- Angular CLI instalado (`npm install -g @angular/cli`).
- Backend (API) rodando em `http://localhost:8080`.

### Passos para a Execução

1.  **Instalar as Dependências:**
    - Navegue até a pasta raiz do frontend no seu terminal.
    - Execute o comando:
      ```bash
      npm install
      ```

2.  **Iniciar a Aplicação de Desenvolvimento:**
    - No mesmo terminal, execute o comando:
      ```bash
      ng serve
      ```
    - A aplicação estará disponível no seu navegador em `http://localhost:4200`.

## 🏛️ Estrutura de Pastas

O projeto segue uma estrutura organizada para facilitar a manutenção:

- `src/app/core`: Contém a lógica central da aplicação (services, guards, interceptors).
- `src/app/pages`: Contém os componentes que representam as páginas principais (Auth, Dashboard, etc.).
- `src/app/shared`: Contém componentes, diretivas ou pipes que são reutilizados em toda a aplicação.