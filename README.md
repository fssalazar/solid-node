# App

GymPass style app.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academimas próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar o check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negocio)

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer o check-in se não estiver perto da academia;
- [x] O check-in só pode ser validado até 20 minutios após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgresSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por páginas;
- [] O usuário deve ser identificado por um JWT (jSON Web Token);