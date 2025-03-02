
import { CourseFormValues } from "../CourseFormContext";

export const formSteps = [
  "Basic Info",
  "Location & Category",
  "Location Details",
  "Pricing & Capacity",
  "Images",
  "Schedule",
  "What to Bring",
  "Learning Outcomes",
];

export const defaultFormValues: CourseFormValues = {
  title: "",
  description: "",
  category: "",
  location: "",
  locationType: "inPerson",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  onlineLink: "",
  classDetails: "",
  difficultyLevel: "beginner",
  price: "",
  capacity: "",
  minParticipants: 1,
  maxParticipants: 10,
  images: [],
  scheduleType: "oneTime",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  recurringDays: [],
  whatToBring: [],
  learningOutcomes: [],
};
