# API de Gerenciamento Unimed - Backend

Esta é a API backend do projeto de teste para desenvolvedor full-stack. Desenvolvida em Java com Spring Boot, ela expõe uma API REST para gerenciar usuários, beneficiários e planos, com autenticação baseada em JSON Web Token (JWT).

## 🚀 Tecnologias Utilizadas

- **Java 21**: Versão da linguagem de programação.
- **Spring Boot 3.x**: Framework principal para a criação da aplicação.
- **Spring Web**: Para a criação dos controllers e endpoints REST.
- **Spring Security**: Para implementação da segurança, autenticação e autorização.
- **Spring Data JPA**: Para a persistência de dados e abstração do acesso ao banco.
- **Hibernate**: Implementação do JPA para mapeamento objeto-relacional (ORM).
- **MySQL**: Banco de dados relacional utilizado para persistir os dados.
- **Auth0 JWT (java-jwt)**: Biblioteca para geração e validação de JSON Web Tokens.
- **Lombok**: Para reduzir o código boilerplate (getters, setters, etc.).
- **Gradle**: Ferramenta de automação de build e gerenciamento de dependências.

## 📋 Funcionalidades Implementadas

- **Autenticação de Usuários**:
  - Endpoint público para **cadastro** (`/api/auth/register`) com criptografia de senha (BCrypt).
  - Endpoint público para **login** (`/api/auth/login`) que retorna um token JWT em caso de sucesso.
- **Segurança com JWT**:
  - Todos os endpoints, exceto os de autenticação, são protegidos.
  - Um filtro de segurança (`SecurityFilter`) intercepta as requisições, valida o `Bearer Token` enviado no cabeçalho `Authorization` e autentica o usuário.
- **Configuração de CORS**:
  - Configuração para permitir requisições da aplicação frontend (Angular) rodando em `http://localhost:4200`.

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- JDK 21 (ou superior).
- XAMPP ou uma instância do MySQL rodando.
- IDE de sua preferência (ex: Spring Tool Suite, IntelliJ IDEA).

### Passos para a Execução

1.  **Configurar o Banco de Dados:**
    - Inicie o serviço do MySQL (através do XAMPP ou outro).
    - Crie um banco de dados com o nome `teste_fullstack`.

2.  **Configurar a Aplicação:**
    - Abra o arquivo `src/main/resources/application.properties`.
    - Verifique se as credenciais do banco de dados estão corretas:
      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/teste_fullstack
      spring.datasource.username=root
      spring.datasource.password=
      ```

3.  **Iniciar a Aplicação:**
    - Importe o projeto como um projeto Gradle na sua IDE.
    - Execute a classe principal `UnimedApplication.java` (a que contém a anotação `@SpringBootApplication`).
    - A API estará disponível em `http://localhost:8080`.

## Endpoints Principais

- `POST /api/auth/register`: Cria um novo usuário.
- `POST /api/auth/login`: Autentica um usuário e retorna um token JWT.
- *(Futuros endpoints de CRUD para Planos e Beneficiários serão protegidos e necessitarão do token)*