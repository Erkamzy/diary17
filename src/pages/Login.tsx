import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { LogIn, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";  // adjust path if needed

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/my-memories");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Имэйл болон нууц үгээ оролгүй нэвтрэх боломжгүй");
      return;
    }

    const success = await login(email, password);

    if (success) {
      toast.success("Амжилттай нэвтэрлээ!");
      navigate("/my-memories");
    } else {
      toast.error("Нэвтрэхэд алдаа гарлаа");
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
            <Label htmlFor="password">Нууц үг</Label>
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

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Нэвтрэх
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-purple-700">
            Аккаунт байхгүй юу?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-600 hover:underline"
            >
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
