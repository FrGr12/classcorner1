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
import { AlertCircle } from "lucide-react";

const TeacherPromotions = () => {
  const handleCreatePromotion = async () => {
    try {
      // Implement create promotion logic here
      toast.success("Promotion created successfully!");
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Failed to create promotion. Please try again.");
    }
  };

  const handleEditPromotion = async () => {
    try {
      // Implement edit promotion logic here
      toast.success("Promotion updated successfully!");
    } catch (error) {
      console.error("Error updating promotion:", error);
      toast.error("Failed to update promotion. Please try again.");
    }
  };

  const handleDiscountTypeChange = (value: string) => {
    try {
      // Implement discount type change logic here
      toast.success("Discount type updated");
    } catch (error) {
      console.error("Error updating discount type:", error);
      toast.error("Failed to update discount type");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Promotions</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>Active Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select onValueChange={handleDiscountTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Off</SelectItem>
                    <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Discount Value</Label>
                <Input type="number" placeholder="Enter value" />
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Summer Special</h3>
                  <p className="text-sm text-muted-foreground">20% off all pottery classes</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        Edit Promotion
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to edit this promotion? This will affect all existing and future bookings using this promotion.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleEditPromotion}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPromotions;