import { Navbar } from "@/components/Navbar";
import { MemoryCard, MemoryProps } from "@/components/MemoryCard";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Энэ мэдээлэл ихэвчлэн өгөгдлийн сангаас ирдэг
const MEMORIES: MemoryProps[] = [
  {
    id: "1",
    title: "Далайн эргийн нар жаргал",
    description: "Малибу далайн эрэг дээр нар жаргаж байхад тэнгэр улбар, ягаан, ягаавтар хөх өнгөөр будаж, үзэсгэлэнтэй байсан. Бид одод гийтэл тэнд байсан.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
    date: "2025 оны 4-р сарын 12",
    author: {
      name: "Эмма Жонсон",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    likes: 24,
    comments: 5
  },
  {
    id: "2",
    title: "Хаврын эхний өдөр",
    description: "Ботаникийн цэцэрлэг дэх сакура модны цэцэглэл. Хаврыг угтах хамгийн төгс арга — найзуудтайгаа инээд хөөр дүүрэн өдөр.",
    imageUrl: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=987&auto=format&fit=crop",
    date: "2025 оны 4-р сарын 15",
    author: {
      name: "Алекс Чен",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    likes: 42,
    comments: 8
  },
  {
    id: "3",
    title: "Гэр бүлийн зугаалга",
    description: "Ээжийн төрсөн өдрийг гэнэтийн зугаалгаар тэмдэглэсэн. Цаг агаар гайхалтай байсан ба бүх хүн маш их хөгжилдсөн.",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=869&auto=format&fit=crop",
    date: "2025 оны 4-р сарын 5",
    author: {
      name: "София Уильямс",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    likes: 37,
    comments: 12
  },
  {
    id: "4",
    title: "Ууланд авирсан адал явдал",
    description: "Сар гаруйн бэлтгэл хийсний эцэст Rainier уулын оргилд гарсан! Оргил дээрх үзэмж нь бүх ядралтыг үнэхээр орлохоор байлаа.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=870&auto=format&fit=crop",
    date: "2025 оны 4-р сарын 2",
    author: {
      name: "Жэймс Уилсон",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    likes: 56,
    comments: 14
  }
];

const FEATURED_MEMORY = {
  id: "featured-1",
  title: "Манай хуримын өдөр",
  description: "Амьдралынхаа хамгийн ид шидтэй өдөр. Гэр бүл, найз нөхдийнхөө хүрээлэлд бид цэцгийн доорх гэрлэн чимэгтэй орчинд ам тангараг өргөсөн. Бүх агшин төгс байсан — ёслолоос эхлээд оддын доор бүжиглэх хүртэл. Би энэ дурсамжийг үүрд нандигнана.",
  imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=870&auto=format&fit=crop",
  date: "2025 оны 4-р сарын 8",
  author: {
    name: "Жессика Мартинез",
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
        {/* Нүүр хуудасны гол хэсэг */}
        <section className="text-center max-w-3xl mx-auto mb-12 py-8">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Үнэт дурсамжаа хадгал
          </h1>
          <p className="text-purple-700 text-lg md:text-xl font-quicksand mb-8 max-w-2xl mx-auto">
            Хувийн дурсамжийн цэцэрлэгээ бий болго. Онцгой мөчүүдээ хайртай хүмүүстэйгээ хуваалцаж, мөнхөд хадгалаарай.
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
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksan text-sm">
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
        
        {/* Сүүлийн дурсамжууд */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-playfair text-2xl font-semibold text-purple-800">Сүүлийн дурсамжууд</h2>
            <Link to="/explore" className="text-purple-500 hover:text-purple-700 font-quicksan text-sm">
              Бүгдийг харах →
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
                Илүү олон тэмдэглэл үзэх
              </Button>
            </Link>
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
