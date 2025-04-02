
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blog-primary">
          Wordsmiths
        </Link>
        
        <Button asChild className="bg-blog-primary hover:bg-blog-primary-hover">
          <Link to="/create" className="flex items-center gap-2">
            <PenSquare size={18} />
            Write
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
