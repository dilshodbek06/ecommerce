import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { BASE_URL } from "@/helpers";
import type { Category, Product } from "@/types";

function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/products");
      setProducts(data);
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

  const handleUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagesUrl([...imagesUrl, fileReader.result as string]);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const productObj = {
        title,
        price: +price,
        categoryId,
        imagesUrl,
      };

      await axios.post(BASE_URL + "/products", productObj);
      setOpen(false);
      clearForm();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setCategoryId("");
    setImagesUrl([]);
    setPrice("");
    setTitle("");
  };

  const getCategoryName = (categoryId: number) => {
    const currentCategory = categories.find((item) => item.id === categoryId);
    if (!currentCategory) {
      return "Not found";
    }
    return currentCategory.name;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Products</h2>
        <Button onClick={() => setOpen(true)}>+ product</Button>
      </div>

      <Table className="container max-w-6xl mx-auto mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  className="h-16 w-28!"
                  src={item.imagesUrl[0]}
                  alt={item.title}
                />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{getCategoryName(item.categoryId)}</TableCell>
              <TableCell>{item.price.toLocaleString()} UZS</TableCell>
              <TableCell className=" flex items-center gap-2">
                <Button
                  size={"icon-lg"}
                  className={"bg-red-500 hover:bg-red-600 text-white"}
                >
                  <Trash />
                </Button>
                <Button
                  size={"icon-lg"}
                  className={"bg-blue-500 hover:bg-blue-600 text-white"}
                >
                  <Pencil />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-center text-lg"}>
              Add Product
            </DialogTitle>
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="file">
                  <div className="h-32 border-2 border-gray-300 cursor-pointer rounded-md  border-dashed hover:bg-gray-100 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <Upload />
                      <p>Rasm yuklang</p>
                    </div>
                    <input
                      onChange={(e) => handleUpload(e.target.files![0])}
                      id="file"
                      type="file"
                      hidden
                    />
                  </div>
                </label>
                {imagesUrl.length > 0 && (
                  <div className="flex mt-4 items-center gap-3">
                    {imagesUrl.map((url) => (
                      <img className="w-16 h-16" src={url} alt="url" />
                    ))}
                  </div>
                )}
              </div>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title..."
                className="py-5"
              />
              <Select onValueChange={(value) => setCategoryId(value as string)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="price..."
                className="py-5"
              />
              <Button onClick={handleSave} className={"w-full mt-1 text-lg"}>
                save
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminProducts;
