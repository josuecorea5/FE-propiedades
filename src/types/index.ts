export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  confirmed: boolean;
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
};

export type Message = {
  id: number;
  createdAt: string;
  message: string;
  propertyId: number;
  updatedAt: string;
  userId: number;
  user?: User;
};

export type Price = Category;

export type Property = {
  id: string;
  bathrooms: number;
  bedrooms: number;
  category: Category;
  categoryId: number;
  createdAt: string;
  description: string;
  garages: number;
  image: string;
  lat: string | number;
  lng: string | number;
  price: Price;
  priceId: number;
  published: boolean;
  street: string;
  title: string;
  updatedAt: string;
  userId: number;
  messages?: Message[];
};

export type PaginationType = {
  totalItems: number;
  offset: number;
  limit: number;
};
