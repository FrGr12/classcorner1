
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

interface BasicInfoSectionProps {
  form: UseFormReturn<any>;
}

const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  return (
    <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[180px_1fr_auto] items-center gap-4">
                <FormLabel className="text-sm font-medium text-primary">Class Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter an engaging title for your class" 
                    className="bg-white border-neutral-200"
                    {...field} 
                  />
                </FormControl>
                <Button 
                  type="button" 
                  onClick={() => console.log('Title saved:', field.value)}
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white"
                >
                  Save
                </Button>
                <FormMessage className="col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-[180px_1fr_auto] items-start gap-4">
                <FormLabel className="text-sm font-medium text-primary pt-2">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what students will learn and experience"
                    className="min-h-[120px] resize-none bg-white border-neutral-200"
                    {...field}
                  />
                </FormControl>
                <Button 
                  type="button" 
                  onClick={() => console.log('Description saved:', field.value)}
                  className="bg-accent-purple hover:bg-accent-purple/90 text-white"
                >
                  Save
                </Button>
                <FormMessage className="col-start-2" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
