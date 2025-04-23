
import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// This would typically come from a database
const ALL_MEMORIES: MemoryProps[] = [
  {
    id: "1",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 42,
    comments: 8
  },
  {
    id: "3",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 37,
    comments: 12
  },
  {
    id: "4",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 56,
    comments: 14
  },
  {
    id: "5",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 87,
    comments: 22
  },
  {
    id: "6",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 68,
    comments: 17
  },
  {
    id: "7",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 49,
    comments: 9
  },
  {
    id: "8",
    title: "titlee",
    description: "Хамгийн үнэ цэнэтэй дурсамжаа мартахгүй байх хэрэгтэйжүү",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "March, 23, 2025",
    author: {
      name: "memory",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 124,
    comments: 27
  }
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedMemories, setDisplayedMemories] = useState(ALL_MEMORIES);

  // Хайлтын функцийг гүйцэтгэх
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = ALL_MEMORIES.filter(
      memory => memory.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                memory.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedMemories(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Хуудасны гарчиг ба хайлт */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="font-playfair text-4xl font-bold mb-4 text-purple-900">Дурсамжаа хайх</h1>
          
          
          {/* Хайлт хийх форм */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-6 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Дурсамжаа хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-purple-200"
              />
            </div>
            <Button 
              type="submit" 
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Хайх
            </Button>
          </form>
        </div>
        
        {/* Хайлтын үр дүнгийн сүлжээ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
        
        {/* Хайлтын үр дүн байхгүй үед харуулах */}
        {displayedMemories.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-purple-800 mb-2"> олдсонгүй</h3>
            <p className="text-purple-600">Өөр хайлтын үг оруулаад үзээрэй</p>
          </div>
        )}
        
        {/* Цааш харах товч */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-300 text-purple-700">
            Цааш үзэх
          </Button>
        </div>
      </main>
    </div>
  );
}