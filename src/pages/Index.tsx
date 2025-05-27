import React, { useEffect, useState } from "react";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "@radix-ui/react-accordion";

const MEMORIES: MemoryProps[] = [
  {
    id: "1",
    title: "Далайн эрЭг",
    description: "далайн эрэг дээр нар жаргаж байна",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "2025 оны 4-р сарын 12",
    author: {
      name: "user 1",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    title: "Хаврын эхний өдөр",
    description: "Хаврын инээд хөөр дүүрэн өдөр.",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "2025 оны 4-р сарын 15",
    author: {
      name: "user 2",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 42,
    comments: 8
  },
  {
    id: "3",
    title: "Гэр бүлийн зугаалга",
    description: "",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "2025 оны 4-р сарын 5",
    author: {
      name: "user3",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 37,
    comments: 12
  },
  {
    id: "4",
    title: "Ууланд авирсан адал явдал",
    description: "Сар гаруйн бэлтгэл хийсний эцэст Rainier уулын оргилд гарсан! ",
    imageUrl: "https://i.pinimg.com/474x/23/b6/6a/23b66aead36280c93df41dbbf142b579.jpg",
    date: "2025 оны 4-р сарын 2",
    author: {
      name: "user4",
      avatar: "https://i.pinimg.com/736x/da/08/4c/da084c7039b468dfa1afb6f62eb6ebe3.jpg"
    },
    likes: 56,
    comments: 14
  }
];

export default function Index() {
  const [memories, setMemories] = useState<MemoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FEATURED_MEMORY = {
    id: "featured-1",
    title: "Хуримын өдөр",
    description: "Амьдралын минь хамгийн чцхал өдөр.",
    imageUrl: "https://imgix.bustle.com/uploads/image/2023/3/23/26351fe6-c505-48f2-affb-fcf11abc22ed-d362-belle-disney.jpg?w=1200&h=630&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.5147&fp-y=0.442",
    date: "2025 оны 3-р сарын 24",
    author: {
      name: "zykk",
      avatar: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=870&auto=format&fit=crop"
    },
    likes: 124,
    comments: 27
  };

  const API_URL = "http://localhost:8000/api/";

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "get_memory" }),
    })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.resultCode === 200 && Array.isArray(data.data)) {
          console.log(data)
          setMemories(
            data.data.map((item: any) => ({
              id: item.id.toString(), 
              title: item.title,
              description: item.description,
              imageUrl: item.imageUrl,
              date: new Date(item.date).toLocaleDateString("mn-MN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              author: {
                name: item.author?.name || "Unknown",
                avatar: item.author?.avatar || "https://via.placeholder.com/40",
              },
              likes: item.likes,
              comments: item.comments,
            }))
          );

        } else {
          throw new Error(data.resultMessage || "Unknown error");
        }
        
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }, []);
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Нүүр хуудасны гол хэсэг */}
        <section className="text-center max-w-3xl mx-auto mb-12 py-8">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Үнэт дурсамжаа хадгал
          </h1>
          <p className="text-purple-700 text-lg md:text-xl font-quicksand mb-8 max-w-2xl mx-auto">
            Хувийн дурсамжийн цэцэрлэгээ бий болго. Онцгой мөчүүдээ хайртай хүмүүстэйгээ хуваалцаарай.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Дурсамж үүсгэх
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" className="rounded-full border-purple-300 px-8 py-6 text-lg text-purple-700">
                <Heart className="mr-2 h-5 w-5" />
                Дурсамж үзэх
              </Button>
            </Link>
          </div>
        </section>

        {/* Онцлох дурсамж */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-purple-800 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
              Онцлох дурсамж
            </h2>
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksand text-sm">
              Бүх дурсамжийг үзэх →
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
                    Энэ дурсамжийг хуваалцах
                  </Button>
                </div>
              </div>

              <div className="order-1 md:order-2 w-[100%] h-[100%]">
                <img 
                  src={FEATURED_MEMORY.imageUrl} 
                  alt={FEATURED_MEMORY.title}
                  className="w-full h-full object-cover rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Сүүлийн дурсамжууд */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-purple-800">Сүүлийн дурсамжууд</h2>
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksand text-sm">
              Бүгдийг харах →
            </Link>
          </div>
          {loading && <p>Түр хүлээнэ үү...</p>}
          {error && <p className="text-red-600">Алдаа гарлаа: {error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {!loading && !error && memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}

            {/* Fallback hardcoded data if needed */}
            {!loading && !error && memories.length === 0 && MEMORIES.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        </section>
      </main>

      {/* Хөл хэсэг */}
      <footer className="bg-white border-t border-purple-100 mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-playfair text-xl mb-4 md:mb-0 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Memory Garden
            </p>
            <p className="text-purple-600 font-quicksand text-sm">
              © 2025 Memory Garden. Бүх дурсамжийг хайраар хадгаллаа.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
