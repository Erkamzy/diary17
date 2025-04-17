
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function Navbar() {
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
            Home
          </Link>
          <Link to="/explore" className="text-purple-800 hover:text-purple-600 transition-colors">
            Explore
          </Link>
          <Link to="/my-memories" className="text-purple-800 hover:text-purple-600 transition-colors">
            My Memories
          </Link>
          <Link to="/add-memory" className="text-purple-800 hover:text-purple-600 transition-colors">
            Add Memory
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/create">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              <span className="font-quicksand">New Memory</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
