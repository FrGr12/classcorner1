
import { CheckSquare } from "lucide-react";

const PreparationInfo = () => {
  return (
    <section className="glass-panel rounded-xl p-8 flex-1">
      <h2 className="text-2xl font-bold mb-6 text-left">What to Bring</h2>
      <ul className="space-y-4 text-neutral-600">
        <li className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-accent-purple mt-0.5" />
          <span className="text-left">Comfortable clothing suitable for crafting</span>
        </li>
        <li className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-accent-purple mt-0.5" />
          <span className="text-left">Note-taking materials (optional)</span>
        </li>
      </ul>
    </section>
  );
};

export default PreparationInfo;
