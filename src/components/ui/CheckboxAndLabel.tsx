import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

type CheckboxAndLabelProps = {
  label: string;
  checked: boolean;
  id: string;
  onChange: (isChecked: boolean) => void;
};

function CheckboxAndLabel({
  label,
  checked,
  id,
  onChange,
}: CheckboxAndLabelProps) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
      </div>
    </div>
  );
}

export default CheckboxAndLabel;
