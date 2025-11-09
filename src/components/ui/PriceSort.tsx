import Typography from "@/components/ui/Typography";
import CheckboxAndLabel from "./CheckboxAndLabel";
import { type SortType } from "./Main";

type PriceSortProps = {
  currentSort: SortType;
  handleSortChange: (sortKey: SortType) => void;
};

function PriceSort({ currentSort, handleSortChange }: PriceSortProps) {
  const sortOptions: SortType[] = [
    "No sorting",
    "Price: Low to High",
    "Price: High to Low",
  ];

  return (
    <div className="pt-5 pl-4 pr-4">
      {" "}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        {" "}
        <div
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 
 has-[data-slot=card-action]:grid-cols-[1fr_auto] 
border-b:pb-6"
        >
          <Typography>Sort by Price</Typography>{" "}
        </div>{" "}
        <div className="flex px-6 gap-90">
          {" "}
          {sortOptions.map((option) => (
            <CheckboxAndLabel
              key={option}
              label={option}
              id={option.replace(/[^a-zA-Z0-9]/g, "")}
              checked={currentSort === option}
              onChange={() => handleSortChange(option)}
            />
          ))}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default PriceSort;
