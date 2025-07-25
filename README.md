O **Recompensa Fácil** nasce para resolver um desafio comum: a gestão de programas de fidelidade. É uma plataforma desenhada para **empresas que recompensam clientes por quantidade de compras**, oferecendo-lhes uma ferramenta centralizada para **acompanhar cada cliente, registrar suas compras e facilitar o controle de recompensas**.

Com o Recompensa Fácil, você simplifica a forma como gerencia a fidelidade dos seus clientes, otimiza o relacionamento e impulsiona as vendas através de um programa de incentivo eficiente e transparente.

---

## Estrutura do Projeto

Este projeto segue uma arquitetura modular e bem organizada para garantir escalabilidade e fácil manutenção:

* **`prisma/`**: Contém os esquemas do [Prisma](https://www.prisma.io/), utilizados para a **criação e gestão das entidades do banco de dados**.
* **`docker-compose.yaml`**:  Define os serviços Docker para o ambiente de desenvolvimento, incluindo a criação e configuração do container MySQL que servirá como banco de dados da aplicação.
* **`src/`**: Diretório principal com o código-fonte da aplicação.
    * **`app.ts`**: O **arquivo de iniciação** da sua aplicação Node.js/Express.
    * **`config/`**: Responsável pelas **configurações gerais do projeto**, incluindo as configurações do Prisma.
    * **`routes/`**: Define os **endpoints da API** e direciona as requisições para os controladores apropriados.
    * **`controllers/`**: Lida diretamente com as **requisições e respostas HTTP**, orquestrando a lógica da aplicação.
    * **`services/`**: Contém as **regras de negócio** e a lógica central da aplicação, sendo a ponte entre controladores e repositórios.
    * **`repositories/`**: Abstrai a lógica de **comunicação direta com o banco de dados**, facilitando a troca de ORMs ou bancos de dados no futuro.
    * **`helpers/`**: Armazena **funções utilitárias** e auxiliares reutilizáveis por toda a aplicação.
    * **`middlewares/`**: Define os **middlewares** que processam as requisições antes que elas cheguem aos controladores (ex: autenticação, validação).

---

## Como Começar (Instalação e Uso)

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/youruser/recompensa-facil.git
    cd recompensa-facil
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o ambiente:**
    * Crie um arquivo `.env` na raiz do projeto, baseado em um possível `.env.example`.
    * Defina as variáveis de ambiente necessárias, como a URL do banco de dados (para o Prisma) e a chave secreta para JWT.
        ```env
        DATABASE_URL="mysql://user:password@localhost:3306/recompensa-facil"
        SECRET_KEY="sua_chave_secreta_jwt_muito_forte_aqui"
        # Outras variáveis de ambiente...
        ```
4.  **Configure o banco de dados com Prisma:**
    * Execute as migrações para criar as tabelas no seu banco de dados:
        ```bash
        npx prisma migrate deploy
        ```
    * (Opcional) Gere o cliente Prisma para TypeScript (se estiver usando TS):
        ```bash
        npx prisma generate
        ```

5.  **Suba o banco de dados com Docker Compose:**
    * Inicie o serviço do banco de dados:
        ```bash
        docker-compose up -d
        ```
        Isso criará e iniciará o container do MySQL em segundo plano.
6.  **Inicie a aplicação:**
    ```bash
    npm run start:dev
    ```

A aplicação estará rodando em `http://localhost:3000` (ou na porta configurada nas suas variáveis de ambiente).

---

## Endpoints da API 

Aqui estão alguns exemplos de como a API do Recompensa Fácil pode ser utilizada:

* `POST /empresa/register` - Registra uma empresa.
* `POST /empresa/login` - Autentica uma empresa e retorna um token JWT.
* `POST /empresa/register-user` - Registra um usuário.
* `POST /empresa/register-compra/:empresaId` - A empresa registra uma compra a determinado usuário.
* `POST /empresa/register-compra/:empresaId` - A empresa registra uma compra a determinado usuário.
* `PATCH /empresa/update/:id` - Atualiza os dados de uma empresa.
* `GET /empresa/find-all-compras/:id` - Retorna todas as compras de uma empresa.

**Nota:** Todos os endpoints que manipulam dados da empresa ou cliente (exceto o de register e login) **requerem autenticação** via token JWT.

---

## Testando a API com Postman

Para interagir com a API do Recompensa Fácil e testar seus endpoints, recomendamos o uso do [Postman](https://www.postman.com/downloads/).

### Passos para Testar:

1.  **Instale o Postman** (se ainda não tiver).
2.  **Inicie a aplicação** seguindo os passos na seção "Como Começar".
3.  **Obtenha um token de autenticação:**
    * Faça uma requisição `POST` para o endpoint de login (ex: `http://localhost:3000/empresa/login`) com as credenciais apropriadas.
    * O corpo da requisição deve ser `JSON` com suas credenciais de usuário/empresa.
    * Você receberá um token JWT na resposta.
4.  **Autentique suas requisições:**
    * Para os endpoints que requerem autenticação, vá na aba "Authorization" do Postman.
    * Selecione o tipo `Bearer Token`.
    * Cole o token JWT obtido no passo anterior no campo "Token".
5.  **Envie as requisições:**
    * Selecione o método HTTP (GET, POST, PUT, DELETE) e insira a URL do endpoint desejado.
    * Para requisições `POST` ou `PUT`, vá na aba "Body", selecione `raw` e `JSON`, e insira os dados no formato JSON.
    * Clique em "Send" para enviar a requisição e ver a resposta da API.

---

## Colaboradores

Este projeto está sendo desenvolvido por:

* **[José Cavalcanti]** ([@josemarcelo0521](https://github.com/josecavalcanti0521))
* **[João Pedro Rodrigues]** ([@Joxxxua](https://github.com/Joxxxua))
