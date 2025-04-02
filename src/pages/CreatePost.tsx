
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/lib/api";
import { PostFormValues } from "@/types";
import PostForm from "@/components/PostForm";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: PostFormValues) => {
    setIsSubmitting(true);
    
    try {
      const newPost = await createPost(values);
      toast.success("Post created successfully!");
      navigate(`/post/${newPost.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h1>
          
          <PostForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Create Post"
          />
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
