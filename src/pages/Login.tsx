
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user exists
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      // Store logged in user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login successful!");
      navigate("/my-memories");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8 border border-purple-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Memory Garden
          </h1>
          <p className="text-purple-600 mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
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
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-purple-700">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <Link to="/" className="text-purple-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
