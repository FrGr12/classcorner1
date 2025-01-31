import { BookOpen, Video, Users, Lightbulb } from "lucide-react";

export const resources = [
  {
    title: "Getting Started Guide",
    description: "Step-by-step tutorial for setting up your teacher profile and listing your first class.",
    type: "guide",
    icon: BookOpen,
    link: "/teach/learning-hub/getting-started",
  },
  {
    title: "Creating Standout Classes",
    description: "Learn how to write compelling class descriptions and choose great photos.",
    type: "guide",
    icon: Lightbulb,
    link: "/teach/learning-hub/standout-classes",
  },
  {
    title: "Marketing Strategies",
    description: "Promote your classes effectively using SEO, social media, and email marketing.",
    type: "guide",
    icon: Users,
    link: "/teach/learning-hub/marketing",
  },
  {
    title: "Booking Optimization",
    description: "Best practices for pricing, discounts, and student engagement.",
    type: "video",
    icon: Video,
    link: "/teach/learning-hub/bookings",
  },
];