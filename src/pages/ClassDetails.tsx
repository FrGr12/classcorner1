import { useParams } from "react-router-dom";
import { mockClasses } from "@/data/mockClasses";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, User2, Clock, Package, CheckCircle2, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ClassDetails = () => {
  const { id, category } = useParams();
  
  const classItem = Object.values(mockClasses)
    .flat()
    .find(item => item.id.toString() === id && item.category === category);

  if (!classItem) {
    return (
      <div className="min-h-screen bg-neutral-100">
        <Navigation />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Class not found</h1>
            <p className="text-neutral-600">The class you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];

  const faqs = [
    {
      question: "What should I bring to class?",
      answer: "All materials are provided, but you may want to bring a notebook and pen for taking notes."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Full refund available up to 7 days before the class. 50% refund up to 48 hours before."
    },
    {
      question: "Is there parking available?",
      answer: "Yes, free parking is available on site."
    },
    {
      question: "Do I need prior experience?",
      answer: `This is a ${classItem.level.toLowerCase()}-level class, ${
        classItem.level === "Beginner" 
          ? "no prior experience needed." 
          : "some basic knowledge is recommended."
      }`
    }
  ];

  const schedule = [
    { time: "00:00", activity: "Welcome and Introduction" },
    { time: "00:30", activity: "Safety Briefing and Equipment Overview" },
    { time: "01:00", activity: "Hands-on Practice" },
    { time: "02:30", activity: "Break" },
    { time: "02:45", activity: "Advanced Techniques" },
    { time: "03:45", activity: "Final Project" },
    { time: "04:30", activity: "Wrap-up and Q&A" }
  ];

  const testimonials = [
    {
      text: "An incredible learning experience! The instructor was knowledgeable and patient.",
      author: "Sarah M."
    },
    {
      text: "Well-structured class with great hands-on practice. Highly recommend!",
      author: "John D."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-purple-200 to-purple-400">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/90 text-primary hover:bg-white/80">
              {classItem.category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {classItem.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Located in {classItem.city}
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Enroll Now
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Description */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Join {classItem.instructor} for an immersive {classItem.category.toLowerCase()} experience. 
                This {classItem.level.toLowerCase()}-level class is perfect for those looking to 
                {classItem.level === "Beginner" ? " start their journey in" : " advance their skills in"} {classItem.category.toLowerCase()}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {Array(4).fill(0).map((_, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Key skill {i + 1}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">What's Included</h3>
                  <ul className="space-y-2">
                    {Array(4).fill(0).map((_, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Package className="w-4 h-4 text-primary" />
                        <span>Material {i + 1}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Course Schedule</h2>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-16 text-sm font-medium">{item.time}</div>
                    <div>
                      <p className="text-neutral-600">{item.activity}</p>
                      {index < schedule.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {Array(3).fill(0).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </section>

            {/* Testimonials */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">What Students Say</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <MessageCircle className="w-8 h-8 text-primary mb-4" />
                    <p className="text-neutral-600 mb-4">{testimonial.text}</p>
                    <p className="font-medium">{testimonial.author}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Details Card */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-semibold">${classItem.price}</span>
                  <Badge variant="secondary">{classItem.level}</Badge>
                </div>
                
                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Available Dates</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dates.map((date, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-neutral-50"
                          >
                            {format(new Date(date), 'MMM d, yyyy')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-neutral-600">4.5 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-neutral-600">{classItem.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User2 className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="font-medium">Instructor</p>
                      <p className="text-sm text-neutral-600">{classItem.instructor}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <p className="font-medium">Rating</p>
                      <p className="text-sm text-neutral-600">{classItem.rating} / 5.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instructor Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About the Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 to-purple-400" />
                <div>
                  <p className="font-medium">{classItem.instructor}</p>
                  <p className="text-sm text-neutral-600">Expert {classItem.category} Instructor</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600">
                With years of experience in teaching {classItem.category.toLowerCase()}, 
                {classItem.instructor} brings expertise and passion to every class.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassDetails;