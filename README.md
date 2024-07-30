# Backend TypeScript com OvernightJS, TypeORM e Suporte Multi-Tenant

Este é um projeto inicial para um backend em TypeScript usando OvernightJS para criação de rotas, TypeORM para gerenciamento de banco de dados e um sistema de multi-tenancy.

## Aviso

Este projeto é uma base para inicio rápido do desenvolvimento, já fornecendo suporte inicial seguindo alguns padrões de arquitetura que são 100% opcionais. Caso deseje não seguir determinado padrão ou estrutura fique a vontade para realizar mudanças.

## Objetivo

Este projeto tem o intuito de servir como uma base inicial já configurada para construção de aplicações multi-tenant. Disponibilizando fluxo de migrations por script e uma estrutura inicial já configurada com o TypeORM funcional no projeto, fornecendo Datasource para "Management Tasks (módulos e fluxos para gerenciamento de tenants na MAIN_DATABASE)" e Datasource para o fluxo de tenants que você deseja implementar.

## Sobre a Arquitetura

Este projeto foi desenvolvido seguindo princípios de Design Orientado a Domínio (DDD) e Clean Architecture, visando manter o código modular, testável e de fácil manutenção. Também está preparado para suportar a abordagem Data Access Object (DAO) para acesso a dados e repository. 

### Design Orientado a Domínio (DDD)

O DDD nos ajuda a modelar a lógica de negócios de forma clara e alinhada com os requisitos do domínio. Os principais conceitos de DDD utilizados neste projeto incluem:

- **Entidades**: Representam objetos do domínio com identidade própria, como `Tenant` e `User` por exemplo.
- **Value Objects / DTO**: Objetos que representam conceitos do domínio sem identidade própria.
- **Agregados**: Conjuntos de entidades e objetos de valor que são tratados como uma única unidade.
- **Repositórios**: Interfaces que abstraem o acesso ao banco de dados, permitindo persistir e recuperar agregados.
- **Serviços de Domínio**: Contêm lógica de negócios que não se encaixa naturalmente em entidades ou objetos de valor.

### Clean Architecture

A Clean Architecture promove a separação de responsabilidades e facilita a evolução do sistema. O projeto está organizado em camadas distintas:

- **Camada de Domínio**: Contém entidades, objetos de valor, agregados e serviços de domínio. Esta camada é independente de frameworks e tecnologias.
- **Camada de Aplicação**: Contém serviços de aplicação, que coordenam a execução das operações de negócio. É onde se encontram os casos de uso do sistema.
- **Camada de Infraestrutura**: Implementa interfaces definidas nas camadas superiores, como repositórios e adaptadores para serviços externos.
- **Camada de Interface**: Contém controladores, serviços de API e quaisquer outras implementações de interface com o usuário.

### Data Access Object (DAO)

Para facilitar o acesso aos dados e promover uma camada de abstração entre a lógica de negócios e a base de dados, o projeto suporta a implementação de Data Access Objects (DAOs). Nesta estrutura inicial podemos usar DAOs como acesso direto a entidade de banco de dados, em um repository podemos fazer uso de DAOs para montar alguma rotina de consulta e retornar o mapeamento dos dados para entidades de domínio. Em resumo DAOs são um caminho direto de acesso os modelos de banco, já os repository lidam mais com entidades. Os DAOs são responsáveis por:

- Executar operações CRUD (Create, Read, Update, Delete) de maneira eficiente.
- Abstrair a lógica de acesso a dados da lógica de negócios.
- Facilitar a troca ou modificação da tecnologia de persistência sem impacto nas camadas superiores.

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
