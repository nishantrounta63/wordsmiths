
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "@/lib/api";
import { Post, PostFormValues } from "@/types";
import PostForm from "@/components/PostForm";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const data = await getPostById(id);
        if (!data) {
          setError("Post not found");
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (values: PostFormValues) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedPost = await updatePost(id, values);
      if (!updatedPost) {
        throw new Error("Failed to update post");
      }
      
      toast.success("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate(`/post/${id}`)}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to post
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={40} className="animate-spin text-blog-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <Button 
                variant="link"
                onClick={() => navigate("/")}
                className="mt-4 text-blog-primary"
              >
                Return to homepage
              </Button>
            </div>
          ) : post ? (
            <PostForm
              initialValues={{
                title: post.title,
                content: post.content,
                author: post.author
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Update Post"
            />
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default EditPost;
