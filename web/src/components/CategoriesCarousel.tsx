"use client"
import axios from 'axios';
import React, { useRef, useState, MouseEvent, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
}

function CategoriesCarousel(categories:any, setCategories:any){
  const categorys: Category[] = [
    { id: 1, name: 'Corrida' },
    { id: 2, name: 'Casual' },
    { id: 3, name: 'Esportivo' },
    { id: 4, name: 'Feminino' },
    { id: 5, name: 'Masculino' },
    { id: 6, name: 'Infantil' }
  ];
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number | null>(null);
  useEffect(()=>{
    axios({})
  },[])

  function handleMouseDown(e: MouseEvent<HTMLDivElement>){
    setIsDragging(true);
    if (carouselRef.current) {
      setStartX(e.pageX - carouselRef.current.offsetLeft);
    }
  };

  function handleMouseMove(e: MouseEvent<HTMLDivElement>){
    if (!isDragging || !startX || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= walk;
    }
  };

  function handleMouseUp(){
    setIsDragging(false);
  };


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
        {categorys.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-lg font-bold">{category.name}</p>
          </div>
        ))}
      </div>
  
    </div>
  );
}

export default CategoriesCarousel;
