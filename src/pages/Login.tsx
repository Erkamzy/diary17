import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { LogIn, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Хэрвээ хэрэглэгч аль хэдийн нэвтэрсэн бол, тэрээр login хуудсанд орж болохгүй
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/"); // Хэрэглэгч аль хэдийн нэвтэрсэн бол profile хуудсанд шилжих
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Шалгах: Имэйл болон нууц үг хоёулаа орсон эсэх
    if (!email || !password) {
      toast.error("Имэйл болон нууц үгээ оролгүй нэвтрэх боломжгүй");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Хэрэглэгчийг олох
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Амжилттай нэвтэрлээ!");
      navigate("/"); // Амжилттай нэвтэрсэн бол profile хуудсанд шилжих
    } else {
      toast.error("Имэйл эсвэл нууц үг буруу байна");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8 border border-purple-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Memory Garden
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Имэйл</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Нууц үг</Label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <LogIn className="mr-2 h-4 w-4" />
            Нэвтрэх
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-purple-700">
            Аккаунт байхгүй юу?{" "}
            <Link to="/signup" className="font-medium text-purple-600 hover:underline">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link to="/" className="text-purple-600 hover:underline">
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}
