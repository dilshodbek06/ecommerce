import { Heart, LogOut, Moon, Shield, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className="py-5 shadow-sm">
      <div className="container text-gray-500 max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="font-medium text-3xl">UZ-SHOP</h1>
        <ul className="flex items-center gap-5">
          <Link to={"/"}>
            <li
              className={`hover:text-orange-600 ${pathname === "/" && "text-orange-500"} cursor-pointer`}
            >
              Bosh sahifa
            </li>
          </Link>
          <li className="hover:text-orange-600 cursor-pointer">Mahsulotlar</li>
          <Link to={"/categories"}>
            <li
              className={`hover:text-orange-600 ${pathname === "/categories" && "text-orange-500"} cursor-pointer`}
            >
              Kategoriyalar
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-2 ">
          <Button size={"icon-lg"} variant={"ghost"}>
            <Moon className="size-5" />
          </Button>
          <Button size={"icon-lg"} variant={"ghost"}>
            <Heart className="size-5" />
          </Button>{" "}
          <Button size={"icon-lg"} variant={"ghost"}>
            <ShoppingCart className="size-5" />
          </Button>
          <Button size={"icon-lg"} variant={"ghost"}>
            <Shield className="size-5" />
          </Button>
          <Button size={"icon-lg"} variant={"ghost"}>
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
