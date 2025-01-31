import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { AlertCircle, Rocket } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TeacherPromotions = () => {
  const [boostCredits, setBoostCredits] = useState(3); // Example initial value

  const handleCreatePromotion = async () => {
    try {
      // Implement create promotion logic here
      toast.success("Promotion created successfully!");
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Failed to create promotion. Please try again.");
    }
  };

  const handleUseBoost = async () => {
    if (boostCredits <= 0) {
      toast.error("No boost credits remaining");
      return;
    }
    
    try {
      // Implement boost logic here
      setBoostCredits(prev => prev - 1);
      toast.success("Boost activated successfully!");
    } catch (error) {
      console.error("Error using boost:", error);
      toast.error("Failed to activate boost. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Promotions & Boosts</h1>
          <p className="text-muted-foreground">
            Manage your promotional campaigns and visibility boosts
          </p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Boost Credits</p>
                <p className="text-2xl font-bold">{boostCredits}</p>
              </div>
            </div>
          </Card>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Create New Promotion</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create New Promotion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to create a new promotion? This will be visible to all students.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCreatePromotion}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Off</SelectItem>
                      <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                      <SelectItem value="bundle">Bundle Deal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input type="number" placeholder="Enter value" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instant Boost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use an instant boost to increase your visibility for 24 hours. Your classes will appear at the top of search results and category pages.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" disabled={boostCredits <= 0}>
                    Use Boost Credit ({boostCredits} remaining)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Activate Boost
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will use 1 boost credit to increase your visibility for the next 24 hours. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUseBoost}>Activate</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPromotions;