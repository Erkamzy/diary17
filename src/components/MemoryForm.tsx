
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Image, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MemoryForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewUrl(fileReader.result);
          // In a real app, you'd upload this to storage and get a URL
          setImageUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving to a database
    setTimeout(() => {
      console.log({ title, description, imageUrl });
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-purple-700 mb-1 font-quicksand">
          Memory Title
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summer beach day..."
          className="rounded-lg border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-purple-700 mb-1 font-quicksand">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about this memory..."
          className="rounded-lg border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px]"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-purple-700 mb-1 font-quicksand">
          Memory Photo
        </label>
        
        {previewUrl ? (
          <div className="relative mb-4 aspect-video rounded-lg overflow-hidden border-2 border-purple-200">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <Button 
              type="button"
              variant="destructive" 
              size="sm" 
              className="absolute top-2 right-2 rounded-full"
              onClick={() => {
                setPreviewUrl("");
                setImageUrl("");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center mb-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Image className="h-10 w-10 text-purple-400" />
              <p className="text-sm text-purple-600 font-quicksand">
                Drag and drop an image, or click to browse
              </p>
              <Button 
                type="button" 
                variant="outline"
                className="mt-2 border-purple-300"
                onClick={() => document.getElementById("memory-image")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Choose Photo
              </Button>
            </div>
            <input
              id="memory-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="border-purple-300"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !title || !description || !imageUrl}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {isSubmitting ? "Saving..." : "Save Memory"}
        </Button>
      </div>
    </form>
  );
}
