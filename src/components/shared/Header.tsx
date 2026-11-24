import { Heart, LogOut, Moon, Shield, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/providers/AuthProvider";

function Header() {
  const { pathname } = useLocation();
  const { currentUser, isLogged } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

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
          <Link to={"/products"}>
            <li
              className={`hover:text-orange-600 ${pathname === "/products" && "text-orange-500"} cursor-pointer`}
            >
              Mahsulotlar
            </li>
          </Link>
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
          {currentUser?.role === "ADMIN" && (
            <Link to={"/admin"}>
              <Button size={"icon-lg"} variant={"ghost"}>
                <Shield className="size-5" />
              </Button>
            </Link>
          )}
          {isLogged ? (
            <Button onClick={handleLogOut} size={"icon-lg"} variant={"ghost"}>
              <LogOut className="size-5" />
            </Button>
          ) : (
            <Button size={"icon-lg"} variant={"ghost"}>
              <User className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
