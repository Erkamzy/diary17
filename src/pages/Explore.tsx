import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMemories, setAllMemories] = useState<MemoryProps[]>([]);
  const [displayedMemories, setDisplayedMemories] = useState<MemoryProps[]>([]);

  // Серверээс дурсамжуудыг татах
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_memory" }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data);
        if (data.resultCode === 200) {
          console.log("Memories loaded:", data.data);
          setAllMemories(data.data);
          setDisplayedMemories(data.data);
        } else {
          console.error("API error:", data.resultMessage);
        }
      })
      .catch(console.error);
  }, []);

  // Хайлтын функц
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = allMemories.filter(
      memory =>
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedMemories(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="font-playfair text-4xl font-bold mb-4 text-purple-900">Дурсамжаа хайх</h1>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>

        {displayedMemories.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-purple-800 mb-2">олдоогүй байна</h3>
            <p className="text-purple-600">Өөр хайлтын үг оруулаад үзээрэй</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-300 text-purple-700">
            Цааш үзэх
          </Button>
        </div>
      </main>
    </div>
  );
}
