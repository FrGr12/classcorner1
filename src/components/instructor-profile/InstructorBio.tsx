import { InstructorProfile } from "@/types/instructor";
interface InstructorBioProps {
  instructor: InstructorProfile;
}
const InstructorBio = ({
  instructor
}: InstructorBioProps) => {
  return <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-left">About</h2>
      <div className="space-y-4">
        <p className="text-neutral-700 leading-relaxed text-left">
          {instructor.bio || "This instructor hasn't added a bio yet. They are passionate about teaching and sharing their expertise with students."}
        </p>
        
        {instructor.teachingExperience && <div>
            <h3 className="font-semibold text-lg text-left">Teaching Experience</h3>
            <p className="text-neutral-700 text-left">{instructor.teachingExperience}</p>
          </div>}
        
        {instructor.expertise && instructor.expertise.length > 0 && <div>
            <h3 className="font-semibold text-lg text-left">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {instructor.expertise.map((skill, index) => <span key={index} className="px-3 py-1 bg-accent-purple/10 text-accent-purple rounded-full text-sm">
                  {skill}
                </span>)}
            </div>
          </div>}
      </div>
    </div>;
};
export default InstructorBio;