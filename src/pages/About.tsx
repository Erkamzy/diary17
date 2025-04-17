
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
              About Memory Garden
            </h1>
            <p className="text-purple-700 text-lg font-quicksand mb-8 max-w-3xl mx-auto">
              A digital sanctuary where cherished moments bloom and beautiful memories are preserved forever.
            </p>
          </section>
          
          <section className="bg-white rounded-3xl shadow-md border border-purple-100 overflow-hidden mb-16">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-playfair text-3xl font-bold mb-6 text-purple-900">Our Story</h2>
                <p className="text-purple-700 font-quicksand mb-4">
                  Memory Garden was born from a simple idea: the most precious things in life are the moments we share with those we love.
                </p>
                <p className="text-purple-700 font-quicksand mb-4">
                  We created this space to help you capture, preserve, and share life's beautiful moments - from major milestones to small, everyday joys that make life meaningful.
                </p>
                <p className="text-purple-700 font-quicksand">
                  Our mission is to nurture a community where memories can be planted, stories can bloom, and connections can grow stronger through shared experiences.
                </p>
              </div>
              <div className="h-64 md:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1032&auto=format&fit=crop" 
                  alt="Friends sharing memories"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center text-purple-900">What Makes Us Special</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Heartfelt Connections</h3>
                <p className="text-purple-600 font-quicksand">
                  Share memories with loved ones and strengthen your bonds through shared experiences.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Beautiful Preservation</h3>
                <p className="text-purple-600 font-quicksand">
                  Capture your moments in a beautiful digital garden that never fades or withers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Easy Sharing</h3>
                <p className="text-purple-600 font-quicksand">
                  Share your special moments with friends, family, or the community with just a click.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 text-center hover:shadow-md transition-shadow">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-pink-500" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3 text-purple-800">Supportive Community</h3>
                <p className="text-purple-600 font-quicksand">
                  Connect with others who appreciate the beauty in life's precious moments.
                </p>
              </div>
            </div>
          </section>
          
          <section className="text-center mb-16 py-12">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-purple-900">Start Planting Your Memories Today</h2>
            <p className="text-purple-700 font-quicksand mb-8 max-w-2xl mx-auto">
              Every moment is a seed that can blossom into a beautiful memory. Don't let them slip away - preserve them in your Memory Garden.
            </p>
            <Link to="/create">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 text-lg">
                Create Your First Memory
              </Button>
            </Link>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-8">
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
