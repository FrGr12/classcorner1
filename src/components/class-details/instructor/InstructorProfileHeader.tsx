
import { Link } from "react-router-dom";
import { ClassItem } from "@/types/class";
import { InstructorClassification } from "@/types/user";
import InstructorBadge from "@/components/instructor-profile/InstructorBadge";

interface InstructorProfileHeaderProps {
  classItem: ClassItem;
  instructorId: string;
  classification: InstructorClassification;
}

const InstructorProfileHeader = ({ 
  classItem, 
  instructorId, 
  classification 
}: InstructorProfileHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-full flex-shrink-0" />
      <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Link to={`/instructor/${instructorId}`} className="hover:underline">
              <h3 className="text-lg sm:text-xl font-medium">{classItem.instructor}</h3>
            </Link>
            <InstructorBadge 
              classification={classification}
              size="sm"
            />
          </div>
          <p className="text-sm sm:text-base text-neutral-600">Expert Craftsperson</p>
        </div>
        <p className="text-sm sm:text-base text-neutral-600 max-w-prose">
          An experienced instructor with over 10 years of teaching experience, passionate about sharing creative skills
          and helping students discover their artistic potential.
        </p>
      </div>
    </div>
  );
};

export default InstructorProfileHeader;
