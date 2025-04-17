
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (existingUsers.some((user: any) => user.email === email)) {
      toast.error("User with this email already exists");
      return;
    }
    
    // Create new user
    const newUser = { id: Date.now().toString(), name, email, password };
    
    // Add to users array
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Set as current user
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    navigate("/my-memories");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8 border border-purple-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Memory Garden
          </h1>
          <p className="text-purple-600 mt-2">Create a new account</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          
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
            <Label htmlFor="password">Password</Label>
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
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-purple-700">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-600 hover:underline">
              Sign in
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
