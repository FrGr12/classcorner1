
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/types/class";

interface InstructorInfoProps {
  classItem: ClassItem;
}

const InstructorInfo = ({ classItem }: InstructorInfoProps) => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">About the Instructor</h2>
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex-shrink-0" />
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium text-left">{classItem.instructor}</h3>
            <p className="text-neutral-600 text-left">Expert Craftsperson</p>
          </div>
          <p className="text-neutral-600 text-left">
            An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
            and helping students discover their artistic potential.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorInfo;
