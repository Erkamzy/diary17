
import { Navbar } from "@/components/Navbar";
import { MemoryForm } from "@/components/MemoryForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateMemory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to garden
          </Link>
          
          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 md:p-8">
            <h1 className="font-playfair text-3xl font-bold mb-6 text-purple-900">Шинэ Дурсамж Үүсгэх</h1>
            <p className="text-purple-700 mb-8 font-quicksand">
            Таны тусгай мөчийг хуваалцаж, үүнийг таны дурсамжийн цэцэрлэгт мөнхлөх.
            </p>
            
            <MemoryForm />
          </div>
        </div>
      </main>
    </div>
  );
}
