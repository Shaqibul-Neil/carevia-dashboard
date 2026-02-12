import { Link } from "react-router";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <ShieldX className="size-24 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          403 - Unauthorized
        </h1>
        <p className="text-muted-foreground text-lg max-w-md">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
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

export default Unauthorized;
