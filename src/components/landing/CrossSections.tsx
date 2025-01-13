import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ClassCard from "./ClassCard";
import { mockClasses } from "@/data/mockClasses";
import { ClassItem } from "@/types/class";

const sections = [
  { title: "Recommended for You", filter: (classes: ClassItem[]) => classes.slice(0, 4) },
  { title: "This Week", filter: (classes: ClassItem[]) => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    console.log('Filtering for This Week:', { today, nextWeek });
    return classes.filter(c => {
      const classDate = new Date(c.date);
      console.log('Class date:', classDate, 'for class:', c.title);
      return classDate >= today && classDate <= nextWeek;
    }).slice(0, 4);
  }},
  { title: "Recently Added", filter: (classes: ClassItem[]) => 
    [...classes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4)
  },
  { title: "Popular Near You", filter: (classes: ClassItem[]) => classes.sort((a, b) => b.rating - a.rating).slice(0, 4) },
  { title: "Most Loved", filter: (classes: ClassItem[]) => classes.sort((a, b) => b.rating - a.rating).slice(0, 4) },
  { title: "Last Minute Deals", filter: (classes: ClassItem[]) => classes.filter(c => c.date.getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000).slice(0, 4) },
  { title: "Seasonal Specials", filter: (classes: ClassItem[]) => classes.slice(0, 4) },
  { title: "Beginner Friendly", filter: (classes: ClassItem[]) => classes.filter(c => c.level === "Beginner").slice(0, 4) },
  { title: "Advanced Courses", filter: (classes: ClassItem[]) => classes.filter(c => c.level === "Advanced").slice(0, 4) },
  { title: "Family Friendly", filter: (classes: ClassItem[]) => classes.slice(0, 4) },
  { title: "Corporate Packages", filter: (classes: ClassItem[]) => classes.slice(0, 4) },
];

const CrossSections = () => {
  // Combine all classes from all categories
  const allClasses = Object.values(mockClasses).flat();
  console.log('Total classes:', allClasses.length);

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto space-y-12">
        {sections.map((section) => {
          const filteredClasses = section.filter(allClasses);
          console.log(`${section.title} filtered classes:`, filteredClasses.length);
          
          if (filteredClasses.length === 0) {
            return null;
          }

          return (
            <div key={section.title} className="space-y-6 px-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredClasses.map((classItem) => (
                  <ClassCard
                    key={classItem.id}
                    title={classItem.title}
                    instructor={classItem.instructor}
                    price={classItem.price}
                    rating={classItem.rating}
                    images={classItem.images}
                    level={classItem.level}
                    date={classItem.date}
                  />
                ))}
              </div>
              <div className="block md:hidden">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {filteredClasses.map((classItem) => (
                      <CarouselItem key={classItem.id}>
                        <ClassCard
                          title={classItem.title}
                          instructor={classItem.instructor}
                          price={classItem.price}
                          rating={classItem.rating}
                          images={classItem.images}
                          level={classItem.level}
                          date={classItem.date}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CrossSections;