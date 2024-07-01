import React from 'react';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo para corridas longas e confortáveis.',
      price: 299.99,
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Tênis Adidas Ultraboost',
      description: 'Tênis de alto desempenho para treinos intensos.',
      price: 249.99,
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Tênis Puma Future Rider',
      description: 'Estilo retro com conforto moderno para o dia a dia.',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/300',
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-1">
      {products.map(product => (
        <div key={product.id} className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-gray-800 mt-2">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
