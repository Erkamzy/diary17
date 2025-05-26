import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "./ui/sonner";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Амжилттай гарав");
  };

  return (
    <header className="border-b border-purple-200 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Memory Garden
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 font-quicksand">
          <Link to="/" className="text-purple-800 hover:text-purple-600 transition-colors">
            Нүүр хуудас
          </Link>
          <Link to="/explore" className="text-purple-800 hover:text-purple-600 transition-colors">
            Хайх
          </Link>
          <Link to="/About" className="text-purple-800 hover:text-purple-600 transition-colors">
            Тухай
          </Link>
          {isAuthenticated && (
            <Link to="/my-memories" className="text-purple-800 hover:text-purple-600 transition-colors">
              Миний Дурсамжууд
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="font-quicksand">Шинэ Дурсамж</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-purple-800 font-medium hidden md:inline">
                  {user?.name}
                </span>
                <Button variant="outline" size="icon" onClick={handleLogout} className="rounded-full">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="font-quicksand">
                  <LogIn className="mr-2 h-4 w-4" />
                  Нэвтрэх
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full font-quicksand">
                  <User className="mr-2 h-4 w-4" />
                  Бүртгүүлэх
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
