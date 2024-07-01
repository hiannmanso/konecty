"use client";
import { Category } from '@/interfaces/category.interface';
import { Product } from '@/interfaces/product.interface';
import axios from 'axios';
import React, { useRef, useState, MouseEvent, useEffect } from 'react';



type Props = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<any>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
};

function CategoriesCarousel({ categories, setCategories, products, setProducts }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/categories`
    }).then(response => {
      console.log(response);
      setCategories(response.data);
    });
  }, []);

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    if (carouselRef.current) {
      setStartX(e.pageX - carouselRef.current.offsetLeft);
    }
  }

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!isDragging || !startX || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft -= walk;
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function filterList(category: string) {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_URL}/products?category=${category}`
    }).then(response => {
      console.log(response);
      setProducts(response.data);
    });
  }

  function handleCategoryClick(categoryName: string) {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      filterList('');
    } else {
      setSelectedCategory(categoryName);
      filterList(categoryName);
    }
  }

  return (
    <div
      className="relative overflow-hidden"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex space-x-4 p-4">
        {categories ? categories.map(category => (
          <div
            key={category.id}
            className={`bg-white rounded-lg shadow-md p-4 text-center cursor-pointer ${selectedCategory === category.name ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <p className="text-lg font-bold">{category.name}</p>
          </div>
        )) : <h1>Carregando categorias...</h1>}
      </div>
    </div>
  );
}

export default CategoriesCarousel;
