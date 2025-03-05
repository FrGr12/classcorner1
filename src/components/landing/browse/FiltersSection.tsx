
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
  onPriceRangeChange: (value: [number, number]) => void;
  onReset: () => void;
}

const categories = [
  "Pottery", "Cooking", "Baking", "Painting & Art", "Candle Making",
  "Jewellery & Metal", "Cocktail & Wine", "Photography", "Music & Dance",
  "Wood Craft", "Textile Craft", "Paper Craft", "Flower & Plants"
];

const timeRanges = [
  { label: "All Dates", value: "all" },
  { label: "This Week", value: "this-week" },
  { label: "This Month", value: "this-month" },
  { label: "Custom Date", value: "custom" },
];

const sortOptions = [
  { label: "Trending", value: "trending", icon: Sparkles },
  { label: "Top Rated", value: "top-rated", icon: Trophy },
  { label: "Last Minute Deals", value: "last-minute", icon: Timer },
  { label: "This Week", value: "this-week", icon: Clock },
  { label: "Recommended", value: "recommended", icon: Sparkles },
];

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
  const SortIcon = sortOptions.find(option => option.value === sortBy)?.icon || Sparkles;
  const { t } = useLanguage();

  const handlePriceRangeChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]] as [number, number]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-4 max-w-5xl mx-auto">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {t("search.category")}
        </h3>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t("categories.title")} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">{t("search.all")}</SelectItem>
            {categories.map((category) => {
              const translationKey = `categories.${category.toLowerCase().replace(/\s+&\s+/g, '_').replace(/\s+/g, '_')}`;
              return (
                <SelectItem key={category} value={category}>
                  {t(translationKey)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {t("class.date") || "Date"}
        </h3>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t("search.anytime")} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.value === "all" ? t("search.anytime") : 
                 range.value === "this-week" ? t("search.thisWeek") :
                 range.value === "this-month" ? t("search.thisMonth") :
                 range.value === "custom" ? t("search.specificDates") : range.label}
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
                {date ? format(date, 'EEE, MMM d') : <span>{t("search.specificDates")}</span>}
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
            {t("search.sortBy") || "Sort By"}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onReset}
            className="text-xs text-neutral-500 hover:text-accent-purple"
            aria-label={t("search.reset") || "Reset all filters"}
          >
            {t("search.reset") || "Reset"}
          </Button>
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="border-neutral-200">
            <SelectValue placeholder={t("search.sortBy") || "Sort by"} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{t(`search.sort.${option.value}`) || option.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 w-[200px]">
        <h3 className="text-sm font-medium mb-3">{t("search.priceRange") || "Price Range"}</h3>
        <div>
          <div className="flex justify-between text-sm text-neutral-600 mb-1">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="mt-2"
            aria-label="Price range"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
