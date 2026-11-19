import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/helpers";
import axios from "axios";
import { Lock, Phone, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!phone || !password) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }
    try {
      // 1. phone orqali userni topamiz
      const { data } = await axios.get(BASE_URL + "/users", {
        params: {
          phoneNumber: phone,
        },
      });
      if (data.length <= 0) {
        toast.error("Siz hali ro'yhatdan o'tmagansiz!");
        navigate("/register");
        return;
      }
      // 2. user kelsa password tekshiramiz
      if (data[0].password !== password) {
        toast.error("Email yoki parol xato!");
        return;
      }
      // 3. role ga qarab sahifaga yuboramiz
      localStorage.setItem("token", data[0].id);
      navigate(data[0].role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UserPlus size={24} />
          </div>

          <CardTitle className="text-2xl font-bold">Profilga Kirish</CardTitle>

          <CardDescription>
            Hisobingizga kirish uchun ma'lumotlaringizni kiriting
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone">Telefon raqam</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  className="pl-10 py-5"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Kamida 8 ta belgi"
                  className="pl-10 py-5"
                  minLength={8}
                  required
                />
              </div>
            </div>

            <Button onClick={handleLogin} type="button" className="w-full">
              Kirish
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Hali ro'yhatdan o'tmaganmisiz?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:underline"
              >
                Ro'yhatdan o'tish
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
