import Typography from "@/components/ui/Typography";
import CheckboxAndLabel from "./CheckboxAndLabel";

function PriceSort() {
  return (
    <div className="pt-5 pl-4 pr-4">
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 
            has-[data-slot=card-action]:grid-cols-[1fr_auto] 
            border-b:pb-6"
        >
          <Typography>Sort by Price</Typography>
        </div>
    <div className="flex px-6 gap-90">
  <CheckboxAndLabel label="No sorting" />
  <CheckboxAndLabel label="Price: Low to High" />
  <CheckboxAndLabel label="Price: High to Low" />
</div>

      </div>
    </div>
  );
}
export default PriceSort;


