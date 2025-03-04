
import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

export interface SavedPaymentMethod {
  id: string;
  last4: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

interface SavedPaymentMethodsProps {
  onSelect: (paymentMethod: SavedPaymentMethod) => void;
  selectedId?: string;
}

export const SavedPaymentMethods = ({ 
  onSelect, 
  selectedId 
}: SavedPaymentMethodsProps) => {
  const [paymentMethods, setPaymentMethods] = useState<SavedPaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_payment_methods')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });

        if (error) throw error;
        setPaymentMethods(data || []);
        
        // Auto-select default payment method if none is selected
        if (data?.length && !selectedId && data.some(pm => pm.is_default)) {
          const defaultMethod = data.find(pm => pm.is_default);
          if (defaultMethod) onSelect(defaultMethod);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error fetching payment methods",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [onSelect, selectedId, toast]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-[72px] w-full rounded-lg" />
        <Skeleton className="h-[72px] w-full rounded-lg" />
      </div>
    );
  }

  if (paymentMethods.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No saved payment methods</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const isSelected = selectedId === method.id;
        const isExpired = new Date(method.exp_year, method.exp_month) < new Date();
        
        return (
          <TooltipProvider key={method.id}>
            <div
              className={`
                border rounded-lg p-4 flex items-center justify-between
                ${isSelected ? 'border-accent-purple bg-accent-purple/5' : 'border-neutral-200'}
                ${isExpired ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-accent-purple/50'}
              `}
              onClick={() => !isExpired && onSelect(method)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-neutral-100 rounded-full">
                  <CreditCard className="w-5 h-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.brand} •••• {method.last4}
                    {method.is_default && (
                      <span className="ml-2 text-xs font-normal text-accent-purple">Default</span>
                    )}
                  </p>
                  <p className="text-sm text-neutral-600">
                    Expires {method.exp_month.toString().padStart(2, '0')}/{method.exp_year}
                    {isExpired && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-2 text-xs font-medium text-red-500">Expired</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This card has expired and cannot be used</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </p>
                </div>
              </div>
              {isSelected && !isExpired && (
                <CheckCircle2 className="w-5 h-5 text-accent-purple" />
              )}
            </div>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default SavedPaymentMethods;
