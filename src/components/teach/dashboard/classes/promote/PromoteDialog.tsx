
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import PromotionPricing from "./PromotionPricing";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PromoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId: number | null;
  promotionType?: 'boost' | 'sponsor' | 'outreach';
}

const PromoteDialog = ({ open, onOpenChange, classId, promotionType }: PromoteDialogProps) => {
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>([]);

  const { data: classes } = useQuery({
    queryKey: ['teacherClasses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getTitleAndDescription = () => {
    const scope = classId ? "Your Class" : "Classes";
    
    switch (promotionType) {
      case 'boost':
        return {
          title: `Boost ${scope}`,
          description: `Increase visibility for your selected classes for a short period`
        };
      case 'sponsor':
        return {
          title: `Sponsor ${scope}`,
          description: `Feature your selected classes at the top of search results`
        };
      case 'outreach':
        return {
          title: "Student Outreach",
          description: "Connect with potential students directly"
        };
      default:
        return {
          title: "Promote Your Classes",
          description: "Choose how you want to promote your classes"
        };
    }
  };

  const { title, description } = getTitleAndDescription();

  const handlePromotionComplete = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Classes</h3>
            <Select
              onValueChange={(value) => {
                if (value === "all") {
                  setSelectedClassIds(classes?.map(c => c.id.toString()) || []);
                } else {
                  setSelectedClassIds([value]);
                }
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Choose classes to promote" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes?.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <PromotionPricing 
            courseIds={selectedClassIds}
            promotionType={promotionType}
            onPromotionComplete={handlePromotionComplete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoteDialog;
