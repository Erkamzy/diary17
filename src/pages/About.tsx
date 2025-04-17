import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Heart, Camera, Share2, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Дурсамж Цэцэрлэгийн Тухай
            </h1>
            <p className="text-purple-700 text-lg font-quicksand mb-8 max-w-3xl mx-auto">
              Хүндэтгэлтэй мөчүүд цэцэглэж, сайхан дурсамжууд мөнхөд хадгалагдах дижитал сүм.
            </p>
          </section>
          
          <section className="bg-white rounded-3xl shadow-md border border-purple-100 overflow-hidden mb-16">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-playfair text-3xl font-bold mb-6 text-purple-900">Манай Түүх</h2>
                <p className="text-purple-700 font-quicksand mb-4">
                  Дурсамж Цэцэрлэг нь амьдралын хамгийн үнэ цэнэтэй зүйл бол бид хайртай хүмүүстэйгээ хуваалцаж буй мөчүүд гэдэг энгийн санаанаас төрсөн.
                </p>
                <p className="text-purple-700 font-quicksand mb-4">
                  Бид энэ орон зайг амьдралын чухал үе шатнаас авахуулаад өдөр тутмын жижиг аз жаргалуудыг баримтжуулж, хадгалахад тань туслахын тулд үүсгэсэн.
                </p>
                <p className="text-purple-700 font-quicksand">
                  Манай зорилго бол дурсамжуудаа тарих, түүхүүд цэцэглэх, туршлагаа хуваалцаж холбогдсон харилцаа хүчтэй болох боломжийг олгодог нийгэмлэгийг өргөжүүлэх явдал юм.
                </p>
              </div>
              <div className="h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1032&auto=format&fit=crop" 
                  alt="Нөхөд дурсамж хуваалцаж байна"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center text-purple-900">Бидний Онцлог Юу Вэ</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Сэтгэл Хөдлөм Холболтууд</h3>
                <p className="text-purple-600 font-quicksand">
                  Хайртай хүмүүстэйгээ дурсамж хуваалцаж, холболтоо бэхжүүлээрэй.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Сайхан Хадгалалт</h3>
                <p className="text-purple-600 font-quicksand">
                  Таны мөчүүдийг хэзээ ч унтрахгүй, гандалгүй үзэсгэлэнтэй дижитал цэцэрлэгт хадгал.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Амархан Хуваалцах</h3>
                <p className="text-purple-600 font-quicksand">
                  Таны тусгай мөчүүдийг найз нөхөд, гэр бүлийнхэн эсвэл нийгэмлэгтэй хялбархан хуваалцаарай.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Дэмжлэгтэй Нийгэмлэг</h3>
                <p className="text-purple-600 font-quicksand">
                  Амьдралын үнэ цэнэтэй мөчүүдийг үнэлдэг хүмүүстэй холбогдоорой.
                </p>
              </div>
            </div>
          </section>
          
          <section className="text-center mb-16 py-12">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-purple-900">Өнөөдөр Дурсамжаа Тарих Эхлүүлээрэй</h2>
            <p className="text-purple-700 font-quicksand mb-8 max-w-2xl mx-auto">
              Бүх мөч нь сайхан дурсамж руу цэцэглэх үр юм. Тэдгээрийг алдаж болохгүй - таны Дурсамж Цэцэрлэгт хадгал.
            </p>
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg">
                Эхний Дурсамжаа Үүсгээрэй
              </Button>
            </Link>
          </section>
        </div>
      </main>
      
      {/* Футер */}
      <footer className="bg-white border-t border-purple-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-playfair text-xl mb-4 md:mb-0 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Дурсамж Цэцэрлэг
            </p>
            <p className="text-purple-600 font-quicksand text-sm">
              © 2025 Дурсамж Цэцэрлэг. Бүх дурсамжууд хайртайгаар хадгалагдсан.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
