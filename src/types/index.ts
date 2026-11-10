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
