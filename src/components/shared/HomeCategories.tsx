import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import { BASE_URL } from "@/helpers";
import { useEffect, useState } from "react";
import type { Category } from "@/types";
import { Link } from "react-router-dom";

function HomeCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/categories");
      setCategories(data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">Kategoriyalar</h1>
          <Link to={"/categories"}>
            <Button
              variant={"link"}
              className={"text-gray-500 hover:text-orange-500"}
            >
              Barchasi <MoveRight />
            </Button>
          </Link>
        </div>
        <div className="grid gap-3 grid-cols-3 mt-6">
          {categories.map((item) => (
            <CategoryCard
              key={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              productCount={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCategories;
