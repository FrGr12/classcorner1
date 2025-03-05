
import { InstructorProfile } from "@/types/instructor";
import { Instagram, Linkedin, Globe } from "lucide-react";

interface SocialLinksProps {
  instructor: InstructorProfile;
}

const SocialLinks = ({ instructor }: SocialLinksProps) => {
  // Check if any social media links or portfolio URL exists
  const hasSocialLinks = instructor.socialMedia?.instagram || 
    instructor.socialMedia?.linkedin || 
    instructor.socialMedia?.website || 
    instructor.portfolioUrl;

  if (!hasSocialLinks) {
    return null;
  }

  const getWebsiteUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Connect with {instructor.firstName}</h3>
      <div className="flex gap-3">
        {instructor.socialMedia?.instagram && (
          <a 
            href={`https://instagram.com/${instructor.socialMedia.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label={`${instructor.firstName}'s Instagram profile`}
          >
            <Instagram className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Instagram</span>
          </a>
        )}
        
        {instructor.socialMedia?.linkedin && (
          <a 
            href={instructor.socialMedia.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label={`${instructor.firstName}'s LinkedIn profile`}
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">LinkedIn</span>
          </a>
        )}
        
        {(instructor.socialMedia?.website || instructor.portfolioUrl) && (
          <a 
            href={getWebsiteUrl(instructor.socialMedia?.website || instructor.portfolioUrl || '')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label={`${instructor.firstName}'s website`}
          >
            <Globe className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Website</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
