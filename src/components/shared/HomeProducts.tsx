import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/helpers";
import { useEffect, useState } from "react";
import type { Category, Product } from "@/types";
import ProductCard from "./ProductCard";

function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/products");
      setProducts(data.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const currentCategory = categories.find((item) => item.id === categoryId);
    if (!currentCategory) {
      return "Topilmadi";
    }
    return currentCategory.name;
  };

  return (
    <div className="py-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">Yangi Mahsulotlar</h1>
          <Link to={"/products"}>
            <Button
              variant={"link"}
              className={"text-gray-500 hover:text-orange-500"}
            >
              Barchasi <MoveRight />
            </Button>
          </Link>
        </div>
        <div className="grid gap-3 grid-cols-4 mt-6">
          {products.map((item) => (
            <ProductCard
              id={item.id}
              key={item.id}
              imageUrl={item.imagesUrl[0]}
              title={item.title}
              price={item.price}
              categoryName={getCategoryName(item.categoryId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeProducts;
