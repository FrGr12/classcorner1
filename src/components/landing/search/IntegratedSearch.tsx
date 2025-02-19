
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchLogic } from "./hooks/useSearchLogic";
import { MobileSearch } from "./components/MobileSearch";
import { DesktopSearch } from "./components/DesktopSearch";

const IntegratedSearch = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    searchInput,
    setSearchInput,
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
    selectedTime,
    matchingCategories,
    matchingTitles,
    userPreferences,
    isLoadingPreferences,
    updatePreferences
  } = useSearchLogic();

  const handleSearch = async () => {
    await updatePreferences();

    let queryString = '';
    const searchParams = [];
    
    if (searchInput.trim()) {
      searchParams.push(`q=${encodeURIComponent(searchInput.trim())}`);
    }
    
    if (selectedCategories.length > 0) {
      searchParams.push(`categories=${encodeURIComponent(selectedCategories.join(","))}`);
    }
    
    if (selectedLocations.length > 0 && !selectedLocations.includes("Everywhere")) {
      searchParams.push(`locations=${encodeURIComponent(selectedLocations.join(","))}`);
    }
    
    if (selectedTime !== "Any week") {
      searchParams.push(`time=${encodeURIComponent(selectedTime)}`);
    }

    if (searchParams.length > 0) {
      queryString = `?${searchParams.join('&')}`;
    }
    
    navigate(`/browse${queryString}`);
    setIsOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (matchingCategories.length === 1) {
        setSelectedCategories([matchingCategories[0]]);
      }
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl ml-4">
      <MobileSearch
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedLocations={selectedLocations}
        selectedTime={selectedTime}
        setSelectedLocations={setSelectedLocations}
        handleSearch={handleSearch}
        handleInputKeyDown={handleInputKeyDown}
        isLoadingPreferences={isLoadingPreferences}
        userPreferences={userPreferences}
        matchingCategories={matchingCategories}
        matchingTitles={matchingTitles}
      />

      <DesktopSearch
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedLocations={selectedLocations}
        selectedTime={selectedTime}
        setSelectedLocations={setSelectedLocations}
        handleSearch={handleSearch}
        handleInputKeyDown={handleInputKeyDown}
        isLoadingPreferences={isLoadingPreferences}
        userPreferences={userPreferences}
        matchingCategories={matchingCategories}
        matchingTitles={matchingTitles}
      />
    </div>
  );
};

export default IntegratedSearch;
