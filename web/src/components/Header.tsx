import { Product } from "@/interfaces/product.interface";


export default function Header({products}:Product) {
  
  return (
    <header className="pt-2">
    <h1 className="text-4xl font-bold" >Tênis</h1>
    <p className="text-2xl text-bold text-gray-600"> {products? products.length:0} Produtos encontrados</p>
  </header>
  );
}