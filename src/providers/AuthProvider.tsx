import { BASE_URL } from "@/helpers";
import type { User } from "@/types";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ContextType = {
  isLogged: boolean;
  currentUser: User | null;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

// const blockedPages = ["/admin", "/admin"];

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname === "/") {
      getCurrentUser();
    }
  }, [pathname]);

  const getCurrentUser = async () => {
    try {
      const id = localStorage.getItem("token");
      if (!id) {
        setIsLogged(false);
        setCurrentUser(null);
        navigate("/login");
        return;
      }
      const { data } = await axios.get(BASE_URL + "/users", {
        params: {
          id,
        },
      });
      if (data.length <= 0) {
        setIsLogged(false);
        setCurrentUser(null);
        navigate("/login");
        return;
      }
      setIsLogged(true);

      // check user role
      if (data[0].role !== "ADMIN") {
        navigate("/");
        return;
      }
      setCurrentUser(data[0]);
    } catch (error) {
      console.log(error);
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("contexxt error");
  }
  return context;
};
