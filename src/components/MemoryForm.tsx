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

const API_URL = "http://127.0.0.1:8000/api/";

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
          file,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Бүх шаардлагатай талбаруудыг бөглөнө үү");
      return;
    }

    const userId = user?.id || "unknown";
console.log("Current user:", user);

    // Таны backend-д яг юу шаардлагатай вэ гэдгийг сайн шалгаарай.
    // Доор зурагны URL-г шууд Data URL-аар илгээж байна. Хэрэв backend зураг upload хийдэггүй бол энэ тохирохгүй байж магадгүй.
    const payload = {
      action: "add_memory",
      title,
      description,
      location,
      memory_date: date,
      image_url: imagePreview?.url || "",
      user_id: userId,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.resultCode === 200) {
        toast.success(data.resultMessage || "Дурсамж амжилттай үүсгэгдлээ!");
        navigate("/my-memories");
      } else {
        toast.error(data.resultMessage || "Алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Сервертэй холбогдоход алдаа гарлаа");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-2xl shadow-md border border-purple-100 p-6 md:p-8"
    >
      {/* Гарчиг */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-purple-800">
          Гарчиг <span className="text-pink-500">*</span>
        </Label>
        <div className="relative">
          <PenLine className="absolute left-3 top-3 h-4 w-4 text-purple-500" />
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Дурсамжийн гарчиг оруулна уу"
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Тайлбар */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-purple-800">
          Тайлбар <span className="text-pink-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Дурсамжийн ард байгаа түүхийг бичнэ үү..."
          className="min-h-[120px]"
          required
        />
      </div>

      {/* Байршил, Огноо */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-purple-800">
            Байршил
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Энэ юу болсон вэ?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date" className="text-purple-800">
            Огноо
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Зураг нэмэх */}
      <div className="space-y-2">
        <Label className="text-purple-800">Зураг нэмэх</Label>

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
            <p className="text-purple-600 mb-1">
              Зураг оруулна уу эсвэл дарж оруулна уу
            </p>
            <p className="text-xs text-purple-400">JPG, PNG, эсвэл GIF 5MB хүртэл</p>
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

      {/* Илгээх товч */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Дурсамж үүсгэх
      </Button>
    </form>
  );
}
