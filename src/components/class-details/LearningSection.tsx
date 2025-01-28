import { CheckSquare } from "lucide-react";

const LearningSection = () => {
  return (
    <section className="glass-panel rounded-xl p-8 flex-1">
      <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
      <ul className="space-y-4 text-neutral-600">
        <li className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-accent-purple mt-0.5" />
          <span>Understanding basic techniques and principles</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-accent-purple mt-0.5" />
          <span>Hands-on practice with expert guidance</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-accent-purple mt-0.5" />
          <span>Tips and tricks from an experienced instructor</span>
        </li>
      </ul>
    </section>
  );
};

export default LearningSection;