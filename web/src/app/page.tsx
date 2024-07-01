"use client"
import CategoriesCarousel from "@/components/CategoriesCarousel";
import Header from "@/components/Header";
import ProductList from "@/components/ProductsList";
import SearchInput from "@/components/SearchInput";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])

  useEffect(() =>{
    axios({
      method:"GET",
      url:`${process.env.NEXT_PUBLIC_API_URL}/products`
  }).then(response =>{
      console.log(response)
      setProducts(response.data)
  });
  },[])
  return (
    <div className="flex justify-center  h-screen bg-gray-100">
      <div className="max-w-screen-lg w-full p-4">
       <SearchInput products={products} setProducts={setProducts} />
        <Header products={products} />
        <CategoriesCarousel categories={categories} setCategories={setCategories} products={products} setProducts={setProducts}/>
        <ProductList products={products} setProducts={setProducts} />
      </div>
    </div>
  );
}
