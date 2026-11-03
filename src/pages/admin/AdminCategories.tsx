import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { BASE_URL } from "@/helpers";
import type { Category } from "@/index";

function AdminCategories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSave = async () => {
    try {
      const categoryObj = {
        name,
        imageUrl,
      };
      await axios.post(BASE_URL + "/categories", categoryObj);
      getCategories();
      setOpen(false);

      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

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

  const clearForm = () => {
    setImageUrl("");
    setName("");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Categories</h2>
        <Button onClick={() => setOpen(true)}>+ category</Button>
      </div>

      <Table className="container max-w-6xl mx-auto mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  className="h-16 w-48!"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>0 ta</TableCell>
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
              Add Category
            </DialogTitle>
            <div className="mt-4 space-y-3">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name..."
                className="py-5"
              />
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="image url..."
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

export default AdminCategories;
