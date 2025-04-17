import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function MyMemories() {
  const [memories, setMemories] = useState<MemoryProps[]>([]);
  const { user } = useAuth(); // `user`-ийг context-с авах

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      return;
    }
  
    const savedMemories = localStorage.getItem('myMemories');
    if (savedMemories) {
      const parsedMemories = JSON.parse(savedMemories);
      const userMemories = parsedMemories.filter((memory: MemoryProps) => memory.userId === user.id);
      setMemories(userMemories);
    }
  }, [user]);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-purple-900">My Memories</h1>
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add New Memory</span>
              </Button>
            </Link>
          </div>

          {memories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-purple-100 p-6 md:p-8">
              <h3 className="text-xl font-medium text-purple-800 mb-4">You haven't added any memories yet</h3>
              <p className="text-purple-600 mb-6">Start capturing your special moments and preserve them in your memory garden.</p>
              <Link to="/create">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Add Your First Memory</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
