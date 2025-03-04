
import { CheckSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PreparationInfo = () => {
  const { t } = useLanguage();
  
  return (
    <section className="glass-panel rounded-xl p-4 sm:p-8 flex-1">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-left">{t('class.whatToBring')}</h2>
      <ul className="space-y-3 sm:space-y-4 text-neutral-600">
        <li className="flex items-start gap-2 sm:gap-3">
          <CheckSquare className="w-4 sm:w-5 h-4 sm:h-5 text-accent-purple mt-0.5" />
          <span className="text-sm sm:text-base text-left">{t('class.clothing')}</span>
        </li>
        <li className="flex items-start gap-2 sm:gap-3">
          <CheckSquare className="w-4 sm:w-5 h-4 sm:h-5 text-accent-purple mt-0.5" />
          <span className="text-sm sm:text-base text-left">{t('class.materials')}</span>
        </li>
      </ul>
    </section>
  );
};

export default PreparationInfo;
