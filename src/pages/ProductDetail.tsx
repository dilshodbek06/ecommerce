import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/helpers";
import type { Category, Product } from "@/types";
import axios from "axios";
import { Heart, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    getCurrentProduct();
    getCategories();
  }, [id]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentProduct = async () => {
    try {
      const { data } = await axios.get(BASE_URL + `/products/${id}`);
      setCurrentProduct(data);
    } catch (error) {
      console.log(error);
      setCurrentProduct(null);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const currentCategory = categories.find((c) => c.id === categoryId);
    if (!currentCategory) {
      return "Not found";
    }
    return currentCategory.name;
  };

  if (!currentProduct) {
    return <h1 className="text-center mt-5 text-3xl">Not found</h1>;
  }

  return (
    <div>
      <Header />
      <div className="py-6 container mx-auto max-w-7xl">
        <Link to={"/"}>
          <Button variant={"link"} className={"pl-0 text-gray-500 text-sm"}>
            <MoveLeft /> Mahsulotlarga qaytish
          </Button>
        </Link>
      </div>
      <div className="py-6 flex gap-5 container mx-auto max-w-7xl">
        {/* IMAGES */}
        <div>
          <img
            className="w-150 h-150 rounded-md object-cover"
            src={currentProduct.imagesUrl[currentImageIndex]}
            alt={currentProduct.title}
          />
          <div className="flex gap-1.5 mt-2 overflow-x-auto">
            {currentProduct.imagesUrl.map((item, index) => (
              <img
                onClick={() => setCurrentImageIndex(index)}
                key={index}
                src={item}
                className={`w-32 h-32  rounded-sm ${currentImageIndex === index ? "border-4 border-sky-500" : ""}`}
                alt={currentProduct.title}
              />
            ))}
          </div>
        </div>
        {/* DETAIL */}
        <div>
          <h4 className="text-gray-800">
            {getCategoryName(currentProduct.categoryId)}
          </h4>
          <h1 className="font-bold text-5xl mt-2">{currentProduct.title}</h1>
          <h5 className="text-blue-500 text-5xl mt-8">
            {currentProduct.price.toLocaleString()} UZS
          </h5>
          <div className="mt-4">
            <p>Miqdor</p>
            <div className="flex text-4xl items-center gap-8 justify-center w-56 rounded-2xl h-18 border-2 border-gray-400 ">
              <button className="cursor-pointer">-</button>
              <p>0</p>
              <button className="cursor-pointer">+</button>
            </div>
          </div>
          <div className="flex gap-4 mt-5">
            <Button className="w-125">Savatga qo'shish</Button>
            <Button
              size={"icon-lg"}
              className={
                "bg-white hover:bg-gray-50 size-11 text-black border border-gray-400"
              }
            >
              <Heart className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
