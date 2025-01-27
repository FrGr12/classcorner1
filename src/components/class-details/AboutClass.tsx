import { ClassItem } from "@/types/class";

interface AboutClassProps {
  classItem: ClassItem;
}

const AboutClass = ({ classItem }: AboutClassProps) => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">About This Class</h2>
      <div className="prose prose-neutral max-w-none">
        <p className="text-neutral-600 leading-relaxed">
          Join {classItem.instructor} for an immersive {classItem.title.toLowerCase()} experience. 
          This hands-on class is perfect for {classItem.level.toLowerCase()} learners looking to develop their skills
          in a supportive environment.
        </p>
      </div>
    </section>
  );
};

export default AboutClass;