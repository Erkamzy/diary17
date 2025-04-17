
import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

// This would typically come from a database, filtered by the current user
// For now we're using mock data for demonstration
const MY_MEMORIES: MemoryProps[] = [
  {
    id: "1",
    title: "Sunset at the Beach",
    description: "Watching the sun go down at Malibu Beach. The colors were absolutely breathtaking, painting the sky in shades of orange, pink, and purple. We stayed until the stars came out.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    date: "April 12, 2025",
    author: {
      name: "You",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    title: "First Day of Spring",
    description: "Cherry blossoms in full bloom at the botanical garden. The perfect way to welcome spring with friends and lots of laughter.",
    imageUrl: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=987&auto=format&fit=crop",
    date: "April 15, 2025",
    author: {
      name: "You",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    likes: 42,
    comments: 8
  }
];

export default function MyMemories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-purple-900">My Memories</h1>
            <Link to="/add-memory">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add New Memory</span>
              </Button>
            </Link>
          </div>
          
          {MY_MEMORIES.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MY_MEMORIES.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-purple-100 p-6 md:p-8">
              <h3 className="text-xl font-medium text-purple-800 mb-4">You haven't added any memories yet</h3>
              <p className="text-purple-600 mb-6">Start capturing your special moments and preserve them in your memory garden.</p>
              <Link to="/add-memory">
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
