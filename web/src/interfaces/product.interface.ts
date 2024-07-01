export interface Product {
  imageUrl: string | undefined;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
