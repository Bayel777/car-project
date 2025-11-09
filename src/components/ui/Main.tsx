import PriceSort from "./PriceSort";
import TableCar from "./TableCar";
import { useUser } from "@/store/UserContext";
import { Alert, AlertTitle } from "@/components/ui/Alert";
import { CheckCircle2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import CarBrands from "./CarBrands";
import FilterAndCreate from "./FilterAndCreate";

export type SortType =
  | "No sorting"
  | "Price: Low to High"
  | "Price: High to Low";

function Main() {
  const { successMessage, setSuccessMessage } = useUser();
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [currentSort, setCurrentSort] = useState<SortType>("No sorting");

  const handleBrandChange = (brand: string, isChecked: boolean) => {
    setSelectedBrands((prevBrands) => {
      if (isChecked) {
        return [...prevBrands, brand];
      } else {
        return prevBrands.filter((b) => b !== brand);
      }
    });
  };

  const handleSortChange = (sortKey: SortType) => {
    setCurrentSort(sortKey);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setCurrentSort("No sorting");
  };

  useEffect(() => {
    if (successMessage) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        setTimeout(() => setSuccessMessage(""), 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);

  return (
    <div className="relative pb-30">
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 
          ${
            showAlert
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
          }
        `}
      >
        {successMessage && (
          <Alert>
            <CheckCircle2Icon className="h-5 w-5" />
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}
      </div>

      <CarBrands
        handleBrandChange={handleBrandChange}
        selectedBrands={selectedBrands}
      />

      <PriceSort
        currentSort={currentSort}
        handleSortChange={handleSortChange}
      />

      <FilterAndCreate onClearFilters={handleClearFilters} />

      <TableCar selectedBrands={selectedBrands} currentSort={currentSort} />
    </div>
  );
}

export default Main;
