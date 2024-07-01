"use client"
import React, { useRef, useState, MouseEvent } from 'react';

interface Category {
  id: number;
  name: string;
}

const CategoriesCarousel: React.FC = () => {
  const categories: Category[] = [
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
  const [scrollLeftDisabled, setScrollLeftDisabled] = useState<boolean>(true);
  const [scrollRightDisabled, setScrollRightDisabled] = useState<boolean>(false);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (carouselRef.current) {
      setStartX(e.pageX - carouselRef.current.offsetLeft);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !startX || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste aqui a sensibilidade de rolagem
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= walk;
    }
  };

  const handleMouseUp = () => {
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
        {categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-lg font-bold">{category.name}</p>
          </div>
        ))}
      </div>
  
    </div>
  );
}

export default CategoriesCarousel;
