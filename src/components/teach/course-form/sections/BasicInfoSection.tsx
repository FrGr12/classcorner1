
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CourseFormValues } from "../CourseFormContext";

interface BasicInfoSectionProps {
  form: UseFormReturn<CourseFormValues>;
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="grid gap-3 sm:gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Class Title</FormLabel>
                <div className="flex gap-2 w-full">
                  <FormControl>
                    <Input 
                      placeholder="Enter an engaging title for your class" 
                      className="flex-1 bg-white border-neutral-200 text-xs sm:text-sm h-9 sm:h-10"
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={() => console.log('Title saved:', field.value)}
                    className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0"
                  >
                    Save
                  </Button>
                </div>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-2 sm:gap-4">
                <FormLabel className="text-xs sm:text-sm font-medium text-primary">Description</FormLabel>
                <div className="flex gap-2 w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Describe what students will learn and experience"
                      className="flex-1 min-h-[100px] sm:min-h-[120px] resize-none bg-white border-neutral-200 text-xs sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    onClick={() => console.log('Description saved:', field.value)}
                    className="bg-accent-purple hover:bg-accent-purple/90 text-white text-xs sm:text-sm h-9 sm:h-10 px-3 flex-shrink-0 self-start"
                  >
                    Save
                  </Button>
                </div>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
