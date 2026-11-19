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
import { Lock, Phone, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !phone || !password || !passwordRepeat) {
      toast.error("Iltimos barcha maydonlarni to'ldiring");
      return;
    }
    if (password !== passwordRepeat) {
      toast.error("Parolni mos kiriting");
      return;
    }
    try {
      const { data } = await axios.get(BASE_URL + `/users`, {
        params: {
          phoneNumber: phone,
        },
      });
      if (data.length != 0) {
        toast.error(
          "Siz oldin ro'yhatdan o'tgansiz!\nIltimos login qilib kiring",
        );
        navigate("/login");
        return;
      }
      // register as new user
      const userObj = {
        fullName,
        phoneNumber: phone,
        password,
        role: "USER",
      };
      const { data: currentUser } = await axios.post(
        BASE_URL + "/users",
        userObj,
      );
      localStorage.setItem("token", currentUser.id);
      navigate("/");
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFullName("");
    setPassword("");
    setPasswordRepeat("");
    setPhone("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border shadow-none">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UserPlus size={24} />
          </div>

          <CardTitle className="text-2xl font-bold">
            Ro'yxatdan o'tish
          </CardTitle>

          <CardDescription>
            Hisob yaratish uchun ma'lumotlaringizni kiriting
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName">To'liq ism</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  id="fullName"
                  name="fullName"
                  placeholder="Ism va familiyangiz"
                  className="pl-10 py-5"
                  required
                />
              </div>
            </div>

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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword">Parolni tasdiqlash</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Parolni qayta kiriting"
                  className="pl-10 py-5"
                  required
                />
              </div>
            </div>

            <Button onClick={handleRegister} type="button" className="w-full">
              Ro'yxatdan o'tish
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Hisobingiz bormi?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Kirish
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
