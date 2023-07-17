Labecomback
Bem-vindo ao Labecomback, o backend responsável por fornecer uma API poderosa para o seu e-commerce. Este projeto utiliza uma variedade de tecnologias avançadas, como Knex, SQLite, TypeScript, métodos HTTP, CORS e Express.

Utilização
Para começar a usar o Labecomback, siga as instruções abaixo:

Certifique-se de ter o Node.js instalado em seu sistema.
Clone este repositório em sua máquina local.
Navegue até o diretório raiz do projeto.
Execute o comando npm i para instalar as dependências do projeto.
Após a instalação e configuração, execute o comando npm run dev para iniciar o servidor localmente.
O servidor estará disponível em http://localhost:3003.
Endpoints
O Labecomback oferece uma API rica em detalhes e configs com os seguintes endpoints:

Usuários
GET /users: Retorna todos os usuários cadastrados.
POST /users: criação de usuários.
Produtos
GET /products: Retorna todos os produtos cadastrados.
GET /products/search?name=nomedoproduto: Retorna um produto específico com base no nome fornecido.
POST /products: Criação de novos produtos.
PUT /products/:id: Atualiza um produto existente com base no ID fornecido.
Compras
POST /purchase: Cria uma nova compra.
GET /purchase/:id: Retorna uma compra específica com base no ID fornecido.
DELETE /purchase/:id: Exclui uma compra com base nas informções fornecidas.
Documentação do Postman
A documentação completa da API do LabEcommerce está disponível no formato do Postman, onde você pode encontrar detalhes sobre cada endpoint, exemplos de requisições e respostas, bem como testar a API de forma interativa.

Para acessar a documentação do Postman para o Labecomback, clique aqui https://documenter.getpostman.com/view/26594544/2s946h7Bsd. Este link será útil para todos os interessados em explorar e utilizar a API do LabEcommerce de forma mais eficiente.

Agora você tem toda a documentção para manipular e dar vida ao seu e-commerce. Não se esqueça de utilizar um software como o Postman ou desenvolver uma aplicação cliente para fazer as requisições adequadas.

Faça bom proveito com o Labecomback e boa sorte com o seu e-commerce!