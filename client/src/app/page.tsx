"use client"
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Header from "@/components/Header";
import ProductList from "@/components/ProductsList";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";

export default function Home() {
  const categories = [
    { id: 1, name: 'Corrida' },
    { id: 2, name: 'Casual' },
    { id: 3, name: 'Esportivo' },
    { id: 4, name: 'Feminino' },
    { id: 5, name: 'Masculino' },
    { id: 6, name: 'Infantil' }
  ];
  
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log('Buscar por:', searchText);
    // Aqui você pode adicionar a lógica para buscar ou filtrar os dados
  };

  return (
    <div className="flex justify-center  h-screen bg-gray-100">
      <div className="max-w-screen-lg w-full p-4">
       <SearchInput/>
        <Header />
        <CategoriesCarousel />
        <ProductList />
      </div>
    </div>
  );
}
