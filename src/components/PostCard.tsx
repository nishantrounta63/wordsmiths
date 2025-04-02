
import { Post } from "@/types";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  // Format the post creation date
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  
  // Truncate the content if it's too long
  const truncatedContent = post.content.length > 150 
    ? `${post.content.substring(0, 150)}...` 
    : post.content;

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <Link to={`/post/${post.id}`}>
          <CardTitle className="text-xl font-bold cursor-pointer text-gray-800 hover:text-blog-primary transition-colors">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 line-clamp-3">{truncatedContent}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between text-sm text-gray-500">
        <span>{post.author}</span>
        <span>{formattedDate}</span>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
