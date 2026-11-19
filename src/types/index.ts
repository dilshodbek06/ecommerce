export type Category = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Product = {
  id: number;
  title: string;
  categoryId: number;
  imagesUrl: string[];
  price: number;
};

export type User = {
  id: number;
  fullName: string;
  phoneNumber: string;
  password: string;
  role: "ADMIN" | "USER";
};
