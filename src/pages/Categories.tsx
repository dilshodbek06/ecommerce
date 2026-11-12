import CategoryCard from "@/components/shared/CategoryCard";
import Header from "@/components/shared/Header";
import { BASE_URL } from "@/helpers";
import type { Category } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container max-w-7xl py-6 mx-auto">
        <h1 className="font-medium text-4xl">Kategoriyalar</h1>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              productCount={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
