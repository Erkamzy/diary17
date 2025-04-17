
import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// This would typically come from a database
const MEMORIES: MemoryProps[] = [
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
  }
];

const FEATURED_MEMORY = {
  id: "featured-1",
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
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="text-center max-w-3xl mx-auto mb-12 py-8">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Preserve Your Precious Moments
          </h1>
          <p className="text-purple-700 text-lg md:text-xl font-quicksand mb-8 max-w-2xl mx-auto">
            Create your personal garden of memories. Share special moments with loved ones and keep them blooming forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Create a Memory
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" className="rounded-full border-purple-300 px-8 py-6 text-lg text-purple-700">
                <Heart className="mr-2 h-5 w-5" />
                Explore Memories
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Featured memory */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-purple-800 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
              Featured Memory
            </h2>
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksan text-sm">
              View all memories →
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="order-2 md:order-1 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={FEATURED_MEMORY.author.avatar} 
                    alt={FEATURED_MEMORY.author.name}
                    className="w-10 h-10 rounded-full border-2 border-purple-200" 
                  />
                  <div>
                    <p className="font-medium text-purple-800">{FEATURED_MEMORY.author.name}</p>
                    <p className="text-sm text-purple-500">{FEATURED_MEMORY.date}</p>
                  </div>
                </div>
                
                <h3 className="font-playfair text-3xl font-bold text-purple-900 mb-4">{FEATURED_MEMORY.title}</h3>
                <p className="text-purple-700 font-quicksand mb-6">{FEATURED_MEMORY.description}</p>
                
                <div className="flex gap-4 mt-auto">
                  <Button variant="outline" className="gap-2 border-purple-200">
                    <Heart className="h-4 w-4" />
                    <span>{FEATURED_MEMORY.likes}</span>
                  </Button>
                  <Button variant="outline" className="gap-2 border-purple-200">
                    Share this memory
                  </Button>
                </div>
              </div>
              
              <div className="order-1 md:order-2 h-64 md:h-auto">
                <img 
                  src={FEATURED_MEMORY.imageUrl} 
                  alt={FEATURED_MEMORY.title}
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Recent memories grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-purple-800">Recent Memories</h2>
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksan text-sm">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEMORIES.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/explore">
              <Button variant="outline" className="border-purple-300 text-purple-700">
                Load More Memories
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-playfair text-xl mb-4 md:mb-0 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Memory Garden
            </p>
            <p className="text-purple-600 font-quicksand text-sm">
              © 2025 Memory Garden. All memories preserved with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
