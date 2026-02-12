import { Link } from "react-router";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <FileQuestion className="size-24 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">404 - Not Found</h1>
        <p className="text-muted-foreground text-lg max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-xs hover:bg-primary/90 transition-colors font-medium"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
