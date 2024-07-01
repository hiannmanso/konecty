"use client"
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Header from "@/components/Header";
import ProductList from "@/components/ProductsList";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";

export default function Home() {
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])

  return (
    <div className="flex justify-center  h-screen bg-gray-100">
      <div className="max-w-screen-lg w-full p-4">
       <SearchInput products={products} setProducts={setProducts} />
        <Header  />
        <CategoriesCarousel categories={categories} setCategories={setCategories} />
        <ProductList products={products} setProducts={setProducts} />
      </div>
    </div>
  );
}
