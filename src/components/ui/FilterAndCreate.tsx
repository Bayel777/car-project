import { Button } from "./Button";

function FilterAndCreate() {
  return (
    <div className="flex justify-between p-4">
      <Button variant="default">Clear All Filters</Button>
      <Button variant="default">Создать</Button>
    </div>
  );
}
export default FilterAndCreate;
