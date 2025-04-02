
import { useState } from "react";
import { PostFormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PostFormProps {
  initialValues?: PostFormValues;
  onSubmit: (values: PostFormValues) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

const PostForm = ({ 
  initialValues = { title: "", content: "", author: "" }, 
  onSubmit,
  isSubmitting,
  submitLabel
}: PostFormProps) => {
  const [values, setValues] = useState<PostFormValues>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!values.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    if (!values.content.trim()) {
      toast.error("Content is required");
      return;
    }
    
    if (!values.author.trim()) {
      toast.error("Author name is required");
      return;
    }
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("There was an error submitting your post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={values.content}
          onChange={handleChange}
          placeholder="Write your post content here..."
          className="w-full min-h-[200px]"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-blog-primary hover:bg-blog-primary-hover"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
};

export default PostForm;
