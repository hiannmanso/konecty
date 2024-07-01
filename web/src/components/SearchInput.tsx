import { Product } from "@/interfaces/product.interface";
import axios from "axios";
import { useState } from "react";

type Props = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<any>>; 
  };
export default function SearchInput({ products, setProducts }: Props) {
    const [searchText, setSearchText] = useState('');
  
    function handleSearch(){
        console.log('Buscar por:', searchText);
        axios({
            method:"GET",
            url:`${process.env.NEXT_PUBLIC_API_URL}/products?name=${searchText}`
        }).then(response =>{
            console.log(response)
            setProducts(response.data)
        });
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="relative">
                <input
                    type="text"
                    className="py-2 pl-10 pr-4 border rounded-lg outline-none focus:ring-2 focus:border-transparent bg-white text-gray-800"
                    placeholder="Buscar produto"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyPress} 
                />
                <button
                    type="button"
                    className="absolute inset-y-0 left-0 flex items-center justify-center px-3 pr-1 text-gray-400 rounded-l-lg hover:bg-gray-300 focus:outline-none"
                    onClick={handleSearch}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.5-4.5M10 18a8 8 0 100-16 8 8 0 000 16z"/>
                    </svg>
                </button>
            </div>
    );
}
