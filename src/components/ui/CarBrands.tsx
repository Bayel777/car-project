
import Typography from "@/components/ui/Typography";
import CheckboxAndLabel from "./CheckboxAndLabel";

type CarBrandsProps = {
  handleBrandChange: (brand: string, isChecked: boolean) => void;
  selectedBrands: string[];
};

function CarBrands({ handleBrandChange, selectedBrands }: CarBrandsProps) {
  const allBrands = [
    "Lexus",
    "Mazda",
    "Audi",
    "BMW",
    "Toyota",
    "Kia",
    "Hyundai",
    "Cadillac",
    "Lixiang",
    "Chevrolet",
  ];

  return (
    <div className=" pt-25 pl-4 pr-4 ">
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
        <div
          className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 
            has-[data-slot=card-action]:grid-cols-[1fr_auto] 
            border-b:pb-6"
        >
          <Typography>Car Brands</Typography>
        </div>
        <div className="px-6 grid grid-flow-col grid-rows-2 gap-4 items-center flex-wrap">
          {allBrands.map((brand) => (
            <CheckboxAndLabel
              key={brand}
              label={brand}
              id={brand.toLowerCase()}
              checked={selectedBrands.includes(brand)}
              onChange={(isChecked) => handleBrandChange(brand, isChecked)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default CarBrands;
