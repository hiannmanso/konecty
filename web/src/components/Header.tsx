
import { useState } from "react";
export default function Header({products}:any) {
  
  return (
    <header className="pt-2">
    <h1 className="text-4xl font-bold" onClick={()=>{console.log(products.length)}}>Tênis</h1>
    <p className="text-2xl text-bold text-gray-600"> {products? products.length:0} Produtos encontrados</p>
  </header>
  );
}