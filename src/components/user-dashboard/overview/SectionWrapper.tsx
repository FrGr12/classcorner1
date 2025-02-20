
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SectionWrapperProps {
  title: string;
  viewAllLink?: string;
  children: React.ReactNode;
}

const SectionWrapper = ({ title, viewAllLink, children }: SectionWrapperProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {viewAllLink && (
          <Button 
            variant="ghost" 
            className="text-accent-purple"
            onClick={() => window.location.href = viewAllLink}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SectionWrapper;
