import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TeacherClasses = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Classes</h1>
        <Button onClick={() => navigate("/teach/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sample class cards - replace with real data */}
        <Card>
          <CardHeader>
            <CardTitle>Pottery Basics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src="/placeholder.svg"
                alt="Class preview"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Next session: Mar 15, 2024
                </p>
                <p className="text-sm text-muted-foreground">
                  8 students enrolled
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherClasses;