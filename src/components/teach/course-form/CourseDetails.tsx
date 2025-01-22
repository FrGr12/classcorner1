import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface CourseDetailsProps {
  form: UseFormReturn<any>;
}

const CourseDetails = ({ form }: CourseDetailsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="learningObjectives"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What Students Will Learn</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List the key skills and knowledge students will gain"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="materialsIncluded"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Materials Included</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List all materials, tools, and resources provided"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="setupInstructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Setup Instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What students need to prepare or bring"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseDetails;