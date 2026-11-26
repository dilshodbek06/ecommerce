import Header from "@/components/shared/Header";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/helpers";
import type { Category, Product } from "@/types";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

function Products() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsClone, setProductsClone] = useState<Product[]>(products);
  const [choosedPrice, setChoosedPrice] = useState(0);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/products");
      setProducts(data);
      setProductsClone(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (searchValue: string) => {
    if (!searchValue) {
      await getProducts();
      return;
    }
    const array = products.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setProductsClone(array);
  };

  const handleCategory = async (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    const array = products.filter((p) => p.categoryId === categoryId);
    setProductsClone(array);
  };

  const handleAll = async () => {
    setSelectedCategoryId(null);
    await getProducts();
  };

  const getCategoryName = (categoryId: number) => {
    const currentCategory = categories.find((item) => item.id === categoryId);
    if (!currentCategory) {
      return "Not found";
    }
    return currentCategory.name;
  };

  const handleRange = (value: string) => {
    const currentPrice = +value;
    setChoosedPrice(currentPrice);
    const array = products.filter((item) => item.price < currentPrice);
    setProductsClone(array);
  };

  return (
    <div>
      <Header />
      <div className="mt-6 container mx-auto">
        <h1 className="font-medium text-4xl">Mahsulotlar</h1>
        <div className="flex mt-3 gap-6">
          {/* FILTERS */}
          <div className="w-75 shadow-md h-fit rounded-md px-4 py-3">
            <p>Qidirish</p>
            <div className="relative">
              <Search className="text-gray-500 size-4 absolute left-2 top-[58%] -translate-y-1/2" />
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                type="search"
                className="mt-2 pl-8 py-5"
                placeholder="Mahsulot nomi..."
              />
            </div>
            <div className="mt-3">
              <p>Kategoriyalar</p>
              <div className="flex flex-col mt-1 gap-1">
                <Button
                  onClick={handleAll}
                  className={`bg-white text-gray-500 hover:bg-orange-500 hover:text-white justify-start ${selectedCategoryId === null && "bg-orange-500 text-white"}`}
                >
                  Hammasi
                </Button>
                {categories.map((item) => (
                  <Button
                    onClick={() => handleCategory(item.id)}
                    key={item.id}
                    className={`bg-white text-gray-500 hover:bg-orange-500 hover:text-white justify-start ${selectedCategoryId === item.id ? "bg-orange-500 text-white" : ""}`}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p>Narx oralig'i ({choosedPrice.toLocaleString()} uzs)</p>
              <input
                defaultValue={0}
                step={100000}
                max={100000000}
                onChange={(e) => handleRange(e.target.value)}
                type="range"
                className="accent-orange-500"
              />
            </div>
          </div>
          {/* PRODUCTS */}
          <div className="grid grid-cols-3 gap-3">
            {productsClone.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                categoryName={getCategoryName(item.categoryId)}
                imageUrl={item.imagesUrl[0]}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
