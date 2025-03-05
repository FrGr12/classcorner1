
import { Filter, Sparkles, Clock, MapPin, Trophy, Timer, Snowflake, GraduationCap, BookOpen, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FiltersSectionProps {
  selectedCategory: string;
  timeRange: string;
  date: Date | undefined;
  sortBy: string;
  priceRange: [number, number];
  showCustomDate: boolean;
  onCategoryChange: (value: string) => void;
  onTimeRangeChange: (value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onSortChange: (value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;  // Updated type
  onReset: () => void;
}

const FiltersSection = ({
  selectedCategory,
  timeRange,
  date,
  sortBy,
  priceRange,
  showCustomDate,
  onCategoryChange,
  onTimeRangeChange,
  onDateChange,
  onSortChange,
  onPriceRangeChange,
  onReset
}: FiltersSectionProps) => {
  const { t } = useLanguage();
  const SortIcon = getSortIcon(sortBy);

  const handlePriceRangeChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]] as [number, number]);
  };

  const categories = [
    "Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making",
    "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance",
    "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"
  ];

  const timeRanges = [
    { label: t('dates.allDates'), value: "all" },
    { label: t('dates.thisWeek'), value: "this-week" },
    { label: t('dates.thisMonth'), value: "this-month" },
    { label: t('dates.customDate'), value: "custom" },
  ];
  
  const sortOptions = [
    { label: t('sort.trending'), value: "trending", icon: Sparkles },
    { label: t('sort.topRated'), value: "top-rated", icon: Trophy },
    { label: t('sort.lastMinute'), value: "last-minute", icon: Timer },
    { label: t('sort.thisWeek'), value: "this-week", icon: Clock },
    { label: t('sort.recommended'), value: "recommended", icon: Sparkles },
  ];

  function getSortIcon(value: string) {
    return sortOptions.find(option => option.value === value)?.icon || Sparkles;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-4 max-w-5xl mx-auto">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {t('filters.category')}
        </h3>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t('filters.allCategories')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{t('filters.allCategories')}</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {t(`categories.${category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {t('filters.date')}
        </h3>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t('filters.selectDateRange')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showCustomDate && (
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={cn(
                  "w-full justify-start text-left font-normal border-neutral-200 mt-2",
                  !date && "text-neutral-500"
                )}
              >
                {date ? format(date, 'EEE, MMM d') : <span>{t('dates.pickDate')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <SortIcon className="w-4 h-4" />
            {t('filters.sortBy')}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-xs text-neutral-500 hover:text-accent-purple"
            aria-label={t('filters.resetAll')}
          >
            {t('filters.reset')}
          </Button>
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t('filters.sortBy')} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 w-[200px]">
        <h3 className="text-sm font-medium mb-3">{t('filters.priceRange')}</h3>
        <div>
          <div className="flex justify-between text-sm text-neutral-600 mb-1">
            <span>{t('currency')}{priceRange[0]}</span>
            <span>{t('currency')}{priceRange[1]}</span>
          </div>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="mt-2"
            aria-label={t('filters.priceRange')}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
