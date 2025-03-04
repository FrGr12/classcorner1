
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DateButtons from "@/components/landing/class-card/DateButtons";
import { ClassItem } from "@/types/class";
import { format } from "date-fns";
import { sv } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClassDatesProps {
  classItem: ClassItem;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const ClassDates = ({ classItem, selectedDate: propSelectedDate, onDateSelect }: ClassDatesProps) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const dates = Array.isArray(classItem.date) ? classItem.date : [classItem.date];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(propSelectedDate);

  // Date formatting locale
  const locale = language === 'sv' ? sv : undefined;

  // Update selected date when prop changes
  useEffect(() => {
    if (propSelectedDate) {
      console.log("ClassDates: propSelectedDate changed:", propSelectedDate);
      setSelectedDate(propSelectedDate);
    }
  }, [propSelectedDate]);

  const handleDateSelect = (date: Date) => {
    console.log("ClassDates: handleDateSelect called with date:", date);
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const handleBooking = () => {
    if (!selectedDate) {
      return;
    }
    
    console.log("ClassDates: handleBooking - navigating to booking-confirmation with date:", selectedDate);
    navigate("/booking-confirmation", { 
      state: { 
        classItem: {
          ...classItem,
          date: selectedDate
        }
      }
    });
  };
  
  return (
    <>
      <Separator className="my-4 sm:my-6" />
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{t('class.availableDates')}</h3>
        </div>
        
        {!selectedDate && (
          <Alert variant="default" className="bg-accent-purple/5 border-accent-purple/20 text-accent-purple">
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('class.selectDatePrompt')}
            </AlertDescription>
          </Alert>
        )}
        
        {selectedDate && (
          <div className="p-3 sm:p-4 bg-neutral-50 rounded-lg border border-accent-purple/20">
            <h4 className="font-medium mb-1 sm:mb-2">{t('class.selectedDate')}</h4>
            <p className="text-neutral-600">
              {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy', { locale })}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              {t('class.classDuration')}: {classItem.duration || '2 hours'}
            </p>
            <div className="mt-4">
              <Button 
                onClick={handleBooking}
                className="w-full sm:w-auto bg-accent-purple hover:bg-accent-purple/90"
              >
                {t('class.continueToBooking')}
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-2">
          <DateButtons 
            dates={dates}
            price={classItem.price}
            selectedDate={selectedDate}
            classId={classItem.id}
            category={classItem.category}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>
    </>
  );
};

export default ClassDates;
