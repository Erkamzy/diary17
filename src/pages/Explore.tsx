
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
    title: "Sunset at the Beach",
    description: "Watching the sun go down at Malibu Beach. The colors were absolutely breathtaking, painting the sky in shades of orange, pink, and purple. We stayed until the stars came out.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    date: "April 12, 2025",
    author: {
      name: "Emma Johnson",
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
      name: "Alex Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    likes: 42,
    comments: 8
  },
  {
    id: "3",
    title: "Family Picnic",
    description: "Celebrating Mom's birthday with a surprise picnic in the park. The weather was perfect and everyone had such a wonderful time together.",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=869&auto=format&fit=crop",
    date: "April 5, 2025",
    author: {
      name: "Sophia Williams",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    likes: 37,
    comments: 12
  },
  {
    id: "4",
    title: "Mountain Hiking Adventure",
    description: "Finally conquered Mt. Rainier after months of training! The view from the top was absolutely worth every blister and early morning workout.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=870&auto=format&fit=crop",
    date: "April 2, 2025",
    author: {
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    likes: 56,
    comments: 14
  },
  {
    id: "5",
    title: "Graduation Day",
    description: "Four years of hard work finally paid off. So proud to have my family there to celebrate this achievement with me.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    date: "March 28, 2025",
    author: {
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    likes: 87,
    comments: 22
  },
  {
    id: "6",
    title: "First Pet",
    description: "Meet Luna! The newest addition to our family. She's already brought so much joy and laughter into our home.",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1074&auto=format&fit=crop",
    date: "March 25, 2025",
    author: {
      name: "Emily Davis",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    likes: 68,
    comments: 17
  },
  {
    id: "7",
    title: "Birthday Celebration",
    description: "Surprise party organized by my best friends. Couldn't ask for better people in my life. Thank you for making me feel so special!",
    imageUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop",
    date: "March 20, 2025",
    author: {
      name: "Daniel Miller",
      avatar: "https://randomuser.me/api/portraits/men/91.jpg"
    },
    likes: 49,
    comments: 9
  },
  {
    id: "8",
    title: "Our Wedding Day",
    description: "The most magical day of our lives. Surrounded by family and friends, we said our vows under a canopy of fairy lights and flowers. Every moment was perfect, from the ceremony to dancing under the stars. I'll cherish these memories forever.",
    imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=870&auto=format&fit=crop",
    date: "April 8, 2025",
    author: {
      name: "Jessica Martinez",
      avatar: "https://randomuser.me/api/portraits/women/16.jpg"
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
          <p className="text-purple-700 font-quicksand">
            Манай олон нийтийн хуваалцсан гайхалтай мөчүүдийг олж мэдээрэй
          </p>
          
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
            <h3 className="text-xl font-medium text-purple-800 mb-2">Дурсамж олдсонгүй</h3>
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