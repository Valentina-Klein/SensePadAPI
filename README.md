# SensePad API — Backend de Acessibilidade Digital 

API RESTful desenvolvida em **Node.js**, **Express** e **SQLite** para autenticação e gerenciamento de usuários do aplicativo móvel **SensePad** (Flutter), que transforma a tela sensível ao toque do smartphone em um touchpad para computador, promovendo acessibilidade digital para pessoas com mobilidade reduzida nos membros superiores. Criada como parte de um Projeto Integrador da Universidade de Sorocaba (Uniso) para o 4º semestre do curso de Análise e Desenvolvimento de Sistemas.


> **API Online (Render):** `https://sensepadapi.onrender.com`
> **Repositório do App Flutter (Frontend Mobile):** `https://github.com/BelitMota/sensepad-mouse-virtual`

---

## Tecnologias Utilizadas

* **Runtime:** Node.js (v22.5+ com módulo nativo `node:sqlite`)
* **Framework Web:** Express
* **Banco de Dados:** SQLite (`DatabaseSync`)
* **Segurança:** `bcryptjs` (hash de senhas) e `jsonwebtoken` (autenticação stateless via JWT `HS256`)
* **Hospedagem:** Render Web Service

---

## Estrutura do Projeto

```text
SensePadAPI/
├── dados/                  # Banco de dados SQLite local (ignorado pelo Git)
├── database/
│   ├── conexao.js          # Conexão com SQLite e inicialização de tabelas
│   └── schema.sql          # Definição da tabela usuarios
├── models/
│   └── usuario.js          # Modelo de dados e serialização segura (sem senha_hash)
├── repositories/
│   ├── usuario_repository.js
│   └── usuario_repository_sqlite.js
├── routes/
│   ├── auth_routes.js      # Rotas públicas (/register, /login)
│   ├── usuario_routes.js   # Rotas protegidas por JWT (/me, /:id)
│   └── validar_id.js       # Middleware de validação de parâmetros numéricos
├── security/
│   ├── config_jwt.js       # Assinatura e verificação de tokens JWT
│   ├── middleware_auth.js  # Interceptador Bearer Token
│   └── senhas.js           # Geração e comparação de hash bcrypt
├── services/
│   ├── auth_services.js    # Regras de autenticação
│   ├── erro_aplicacao.js   # Classe de erros HTTP padronizados
│   ├── usuario_services.js # Validações e regras de negócio de usuários
│   └── validacao.js        # Validações de campos obrigatórios, e-mail e senha
├── .env.example            # Modelo de variáveis de ambiente
├── package.json
├── requisicoes.http        # Arquivo de testes para VS Code REST Client
├── seed.js                 # Carga inicial de usuários de teste
└── server.js               # Ponto de entrada da aplicação
```

---

## Como Executar Localmente

### 1. Clonar o repositório e instalar dependências
```bash
cd SensePadAPI
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=8h
DB_PATH=./dados/acessibilidade.sqlite
```

### 3. Iniciar o servidor
```bash
npm start
```
O servidor iniciará em `http://0.0.0`.

*(O banco SQLite e os usuários iniciais são criados automaticamente na inicialização caso o banco esteja vazio).*

---

## Deploy e Credenciais de Teste

A API está hospedada no **Render** (`https://sensepadapi.onrender.com`). Como o plano gratuito entra em modo de suspensão após 15 minutos de inatividade, a primeira requisição pode levar cerca de 30 a 50 segundos para reativar o servidor.

### Contas Pré-Cadastradas (Auto-Seed)
* **E-mails:** `usuario1@acessibilidade.com`, `usuario2@acessibilidade.com`, `admin@acessibilidade.com`
* **Senha padrão:** `123456`

---

## Endpoints da API

*(Importante: Todos os endpoints começam com /api, não existe root (/). Para obter o status da API, use /api/status.)*

### Rotas Públicas

| Método | Endpoint | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/status` | Verifica se a API está online | `200 OK` |
| `POST` | `/api/auth/register` | Cadastra novo usuário (`username`, `email`, `password`) | `201 Created` |
| `POST` | `/api/auth/login` | Autentica usuário e retorna token JWT (`email`, `password`) | `200 OK` |

### Rotas Protegidas (Exigem Header `Authorization: Bearer <token>`)

| Método | Endpoint | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios/me` | Retorna os dados do usuário autenticado | `200 OK` |
| `GET` | `/api/usuarios` | Lista todos os usuários cadastrados | `200 OK` |
| `GET` | `/api/usuarios/:id` | Busca um usuário específico pelo ID | `200 OK` |
| `PUT` | `/api/usuarios/:id` | Atualiza dados do próprio usuário | `200 OK` |
| `DELETE` | `/api/usuarios/:id` | Remove a conta do próprio usuário | `204 No Content` |
