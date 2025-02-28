
import { Book, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstructorProfile } from "@/types/instructor";

interface InstructorBioProps {
  instructor: InstructorProfile;
}

const InstructorBio = ({ instructor }: InstructorBioProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Book className="h-5 w-5 text-accent-purple" />
        About {instructor.firstName}
      </h2>
      
      <div className="text-neutral-700 mb-6 whitespace-pre-line">
        {instructor.bio || "No bio available."}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-accent-purple/5 rounded-lg">
          <h3 className="font-medium mb-2">Teaching Experience</h3>
          <p className="text-neutral-700">{instructor.teachingExperience || "Not specified"}</p>
        </div>
        
        <div className="p-4 bg-accent-purple/5 rounded-lg">
          <h3 className="font-medium mb-2">Preferred Teaching Method</h3>
          <p className="text-neutral-700">
            {instructor.preferredTeachingMethod === "online" ? "Online Classes" : 
             instructor.preferredTeachingMethod === "hybrid" ? "Online & In-Person" : 
             "In-Person Classes"}
          </p>
        </div>
      </div>
      
      {instructor.portfolioUrl && (
        <div className="flex justify-end">
          <Button variant="link" className="text-accent-purple gap-1 p-0" onClick={() => window.open(instructor.portfolioUrl, '_blank')}>
            Visit Portfolio <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {instructor.socialMedia && (Object.values(instructor.socialMedia).some(x => x)) && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium mb-2">Connect with {instructor.firstName}</h3>
          <div className="flex gap-4">
            {instructor.socialMedia.instagram && (
              <a href={`https://instagram.com/${instructor.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-accent-purple">
                Instagram
              </a>
            )}
            {instructor.socialMedia.linkedin && (
              <a href={instructor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-accent-purple">
                LinkedIn
              </a>
            )}
            {instructor.socialMedia.website && (
              <a href={instructor.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-accent-purple">
                Website
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorBio;
