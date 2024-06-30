# API de Produtos

A API de produtos permite a gestão de produtos em um sistema.

---

## Listar Todos os Produtos

Retorna todos os produtos cadastrados.

- **URL**

  `/products`

- **Método**

  `GET`

- **Parâmetros de Consulta Opcionais**

  - `name`: Filtra os produtos pelo nome.
  - `category`: Filtra os produtos pela categoria.

- **Exemplo de Requisição**

  ```bash
  curl -X GET 'http://localhost:3000/products?name=Product&category=Category'
