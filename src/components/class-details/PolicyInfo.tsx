
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PolicyInfo = () => {
  const { t } = useLanguage();
  
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="font-bold mb-6 text-left text-xl">{t("class.policy")}</h2>
      <div className="space-y-6 text-neutral-600">
        <div>
          <h3 className="font-medium text-primary mb-2 text-left flex items-center gap-2">
            Cancellation & Refund Policy
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-neutral-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Our refund policy is designed to be fair to both students and instructors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <div className="p-4 rounded-lg space-y-2 text-left bg-primary-foreground">
            <p className="font-medium">Our flexible refund policy:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-left">
                Cancel more than 48 hours before class: Full refund
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline-block h-4 w-4 text-neutral-400 cursor-help ml-1" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refund will be processed automatically to your original payment method</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li className="text-left">
                Cancel within 48 hours of class: No refund
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline-block h-4 w-4 text-neutral-400 cursor-help ml-1" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Late cancellations impact instructor preparation and class availability</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li className="text-left">All refunds are automatically processed to your original payment method</li>
              <li className="text-left">Refunds typically take 5-7 business days to appear in your account</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2 text-left flex items-center gap-2">
            Group Bookings
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-neutral-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Special rates available for groups of 6 or more</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <p className="text-left">Available for 6 or more participants. Contact the instructor for special rates and arrangements.</p>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2 text-left flex items-center gap-2">
            Private Sessions
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-neutral-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Personalized one-on-one instruction tailored to your needs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <p className="text-left">One-on-one instruction available upon request. Contact for pricing and availability.</p>
        </div>
      </div>
    </section>
  );
};

export default PolicyInfo;
