import Typography from "@/components/ui/Typography";
import CheckboxAndLabel from "./CheckboxAndLabel";

function CarBrands() {
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
          <CheckboxAndLabel label="Lexus" />
          <CheckboxAndLabel label="Mazda" />
          <CheckboxAndLabel label="Audi" />
          <CheckboxAndLabel label="BMW" />
          <CheckboxAndLabel label="Toyota" />
          <CheckboxAndLabel label="Kia" />
          <CheckboxAndLabel label="Hyundai" />
          <CheckboxAndLabel label="Cadillac" />
          <CheckboxAndLabel label="Lixiang" />
          <CheckboxAndLabel label="Chevrolet" />
        </div>
      </div>
    </div>
  );
}
export default CarBrands;




