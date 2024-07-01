import React from 'react';
type Product = {
  imageUrl: string | undefined;
  id: number;
  name: string;
  price: number;
  category: string;
  description:string;
  createdAt:Date;
  updatedAt:Date;
};
type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<any>>; 
};
const ProductList = ({ products, setProducts }: Props)  => {
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
