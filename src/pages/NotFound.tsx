import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSeo } from "@/hooks/use-seo";

export default function NotFound() {
  useSeo({ title: "Page Not Found", description: "This page doesn't exist." });

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-4xl font-medium">404</h1>
      <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
      <Button asChild className="mt-8">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
