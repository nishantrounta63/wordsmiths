
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPostById, deletePost } from "@/lib/api";
import { Post as PostType } from "@/types";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    
    try {
      const success = await deletePost(id);
      if (success) {
        toast.success("Post deleted successfully");
        navigate("/");
      } else {
        toast.error("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Format the post creation date
  const formattedDate = post?.createdAt 
    ? format(new Date(post.createdAt), "MMMM d, yyyy")
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to posts
          </Button>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={40} className="animate-spin text-blog-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <Link to="/" className="text-blog-primary hover:underline mt-4 inline-block">
                Return to homepage
              </Link>
            </div>
          ) : post ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                  <div className="text-gray-600">
                    <span className="font-medium">{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/edit/${post.id}`)}
                  >
                    <Pencil size={16} className="mr-2" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 size={16} className="mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              
              <div className="prose max-w-none">
                {post.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Post;
