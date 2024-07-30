# Backend TypeScript com OvernightJS, TypeORM e Suporte Multi-Tenant

Este é um projeto inicial para um backend em TypeScript usando OvernightJS para criação de rotas, TypeORM para gerenciamento de banco de dados e um sistema de multi-tenancy.

## Objetivo

Este projeto tem o intuito de servir como uma base inicial já configurada para construção de aplicações multi-tenant. Dispoibilizando fluxo de migrations por script e uma estrutura inicial já configurada com o TypeORM e funcional.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)

- [TypeScript](https://www.typescriptlang.org/)

- [PostgreSQL](https://www.postgresql.org/) (ou outro banco de dados suportado pelo TypeORM)

- [MySQL](https://www.mysql.com/) (ou outro banco de dados suportado pelo TypeORM)

## Instalação

1. Clone o repositório:

```sh

git clone https://github.com/PedroSS11/example-saas-multitenant-typeorm

cd nome-do-repositorio

```

2. Instale as dependências do projeto:

```sh

npm install / yarn

```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

```env

DATABASE_HOST=seu-host

DATABASE_PORT=0000

DATABASE_USER=seu-usuario

DATABASE_PASSWORD=sua-senha

MAIN_DATABASE=nome-do-banco-de-gerenciamento

```

## Estrutura do Projeto

```plaintext
database/
    ├── typeorm/
        ├── migrations/
src/

	├── http/

		└── rest/

            └── controller/

	├── infra/

		└── typeorm/

			└── datasource

	├── persistence/

		└── entities

		└── repository

	├── utils/

├── index.ts

└── server.ts

```
