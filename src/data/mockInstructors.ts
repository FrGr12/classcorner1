
import { InstructorProfile, InstructorReview } from "@/types/instructor";
import { mockClasses } from "@/data/mockClasses";

// Dummy instructors data for preview
export const dummyInstructors: Record<string, InstructorProfile> = {
  "1": {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    displayName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 234-567-8901",
    bio: "I'm a pottery artist with over 15 years of experience. I specialize in wheel throwing and hand-building techniques, and I love sharing my passion with students of all skill levels.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "London, UK",
    teachingExperience: "15+ years teaching pottery classes",
    expertise: ["Wheel Throwing", "Hand Building", "Glazing Techniques", "Raku Firing"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.sarahjohnsonpottery.com",
    averageRating: 4.8,
    totalReviews: 127,
    totalStudents: 850,
    totalClasses: 42,
    socialMedia: {
      instagram: "sarahjohnsonpottery",
      linkedin: "https://linkedin.com/in/sarahjohnsonpottery",
      website: "https://www.sarahjohnsonpottery.com"
    },
    classes: mockClasses["Pottery"].slice(0, 2),
    userType: "teacher"
  },
  "2": {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    displayName: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 345-678-9012",
    bio: "I've been a ceramics instructor for over a decade, focusing on contemporary pottery techniques. My approach combines traditional methods with modern artistic expression, helping students develop their unique style.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Manchester, UK",
    teachingExperience: "12 years teaching experience",
    expertise: ["Contemporary Ceramics", "Sculptural Pottery", "Surface Design", "Kiln Firing"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.michaelchenceramics.com",
    averageRating: 4.9,
    totalReviews: 94,
    totalStudents: 620,
    totalClasses: 28,
    socialMedia: {
      instagram: "michaelchencraft",
      linkedin: "https://linkedin.com/in/michaelchencraft",
      website: "https://www.michaelchencraft.com"
    },
    classes: mockClasses["Pottery"].slice(2, 4),
    userType: "teacher"
  },
  "3": {
    id: "3",
    firstName: "Marco",
    lastName: "Rossi",
    displayName: "Marco Rossi",
    email: "marco.rossi@example.com",
    phone: "+1 456-789-0123",
    bio: "As an Italian chef with 20 years of experience, I bring authentic pasta-making traditions to my classes. I trained in Italy and have worked in Michelin-starred restaurants before dedicating myself to teaching the art of Italian cuisine.",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    location: "Birmingham, UK",
    teachingExperience: "8 years teaching Italian cooking",
    expertise: ["Fresh Pasta Making", "Italian Regional Cuisine", "Sauce Preparation", "Italian Desserts"],
    preferredTeachingMethod: "in-person",
    portfolioUrl: "https://www.chefmarcorossi.com",
    averageRating: 4.7,
    totalReviews: 83,
    totalStudents: 540,
    totalClasses: 32,
    socialMedia: {
      instagram: "chefmarcorossi",
      linkedin: "https://linkedin.com/in/chefmarcorossi",
      website: "https://www.chefmarcorossi.com"
    },
    classes: mockClasses["Cooking"],
    userType: "teacher"
  }
};

export const dummyReviews: InstructorReview[] = [
  {
    id: 1,
    instructorId: "1",
    reviewerId: "user1",
    reviewerName: "Emma Williams",
    reviewerAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
    comment: "Sarah is an amazing teacher! Her pottery class was so well-structured, and she was incredibly patient with beginners like me. I created a beautiful bowl that I'm proud to display in my home.",
    classId: 1,
    className: "Introduction to Pottery",
    date: "2023-10-15",
    instructorResponse: "Thank you so much, Emma! It was a pleasure having you in class. Your bowl turned out beautifully, and I hope to see you in one of my advanced classes soon!"
  },
  {
    id: 2,
    instructorId: "1",
    reviewerId: "user2",
    reviewerName: "James Taylor",
    reviewerAvatar: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 4,
    comment: "I took Sarah's wheel throwing workshop, and it was very informative. She clearly knows her craft and explains techniques well. The only reason for 4 stars instead of 5 is that the class was a bit crowded, which limited one-on-one time.",
    classId: 2,
    className: "Wheel Throwing Workshop",
    date: "2023-09-22"
  },
  {
    id: 3,
    instructorId: "2",
    reviewerId: "user3",
    reviewerName: "Sophia García",
    reviewerAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    comment: "Michael's advanced pottery techniques class pushed my skills to the next level. His innovative approach to form and texture has completely transformed how I think about ceramics. Highly recommended!",
    classId: 9,
    className: "Advanced Pottery Techniques",
    date: "2023-11-05",
    instructorResponse: "I'm thrilled to hear that, Sophia! Your pieces showed remarkable improvement, and I was impressed by your willingness to experiment with new techniques."
  }
];
