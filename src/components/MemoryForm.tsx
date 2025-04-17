
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Camera, PenLine, PlusCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ImagePreview {
  url: string;
  file: File;
}

export function MemoryForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({
          url: reader.result as string,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create a new memory object
    const newMemory = {
      id: Date.now().toString(),
      userId: user?.id || "unknown", // Associate memory with user
      title,
      description,
      location,
      date,
      image: imagePreview?.url || null,
      likes: 0,
      comments: []
    };

    // Get existing memories or initialize
    const existingMemories = JSON.parse(localStorage.getItem("myMemories") || "[]");
    
    // Add new memory to the array
    const updatedMemories = [newMemory, ...existingMemories];
    
    // Save back to localStorage
    localStorage.setItem("myMemories", JSON.stringify(updatedMemories));
    
    toast.success("Memory created successfully!");
    navigate("/my-memories");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-md border border-purple-100 p-6 md:p-8">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-purple-800">
          Title <span className="text-pink-500">*</span>
        </Label>
        <div className="relative">
          <PenLine className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your memory a title"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-purple-800">
          Description <span className="text-pink-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell the story behind this memory..."
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-purple-800">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where did this happen?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-purple-800">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-purple-800">Add Photo</Label>
        
        {imagePreview ? (
          <div className="relative">
            <img 
              src={imagePreview.url} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button 
              type="button" 
              size="icon" 
              variant="destructive"
              className="absolute top-2 right-2 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center cursor-pointer hover:bg-purple-50 transition-colors"
          >
            <Camera className="mx-auto h-8 w-8 text-purple-400 mb-2" />
            <p className="text-purple-600 mb-1">Drag photo here or click to upload</p>
            <p className="text-xs text-purple-400">JPG, PNG, or GIF up to 5MB</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Memory
      </Button>
    </form>
  );
}
