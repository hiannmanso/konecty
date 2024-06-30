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
  
- **Exemplo de Resposta**
```bash
[
  {
    "id": 1,
    "name": "Product 1",
    "description": "Description 1",
    "category": "Category 1",
    "price": 100,
    "imageUrl": "http://example.com/image.jpg",
    "createdAt": "2024-06-30T12:00:00Z",
    "updatedAt": "2024-06-30T12:00:00Z"
  }
]
```

## Obter um Produto por ID

Retorna um produto específico pelo seu ID.

- **URL**

  `/products/:id`

- **Método**

  `GET`
  
- **Exemplo de Requisição**

  ```bash
  curl -X GET 'http://localhost:3000/products/1'

- **Exemplo de Resposta**

  ```bash
  {
    "id": 1,
    "name": "Product 1",
    "description": "Description 1",
    "category": "Category 1",
    "price": 100,
    "imageUrl": "http://example.com/image.jpg",
    "createdAt": "2024-06-30T12:00:00Z",
    "updatedAt": "2024-06-30T12:00:00Z"
  }
  ```
