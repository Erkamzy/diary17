
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";

export interface MemoryProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  userId?: string;
}

export function MemoryCard({ memory }: { memory: MemoryProps }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(memory.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-purple-100">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={memory.imageUrl}
          alt={memory.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={memory.author.avatar} />
              <AvatarFallback>{memory.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-purple-800">{memory.author.name}</p>
              <p className="text-xs text-purple-500">{memory.date}</p>
            </div>
          </div>
        </div>
        <h3 className="font-playfair font-semibold text-xl mb-2 text-purple-900">{memory.title}</h3>
        <p className="text-purple-700 font-quicksand mb-4 line-clamp-3">{memory.description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-purple-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`gap-1 ${liked ? 'text-pink-500' : 'text-purple-700'}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-pink-500' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-1 text-purple-700">
            <MessageCircle className="h-4 w-4" />
            <span>{memory.comments}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-1 text-purple-700">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
