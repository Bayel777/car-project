import { Button } from "./Button";

import { useNavigate } from "react-router-dom";

type FilterAndCreateProps = {
  onClearFilters: () => void;
};

function FilterAndCreate({ onClearFilters }: FilterAndCreateProps) {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/cars/create");
  };

  return (
    <div className="flex justify-between p-4">
      <Button variant="default" onClick={onClearFilters}>
        Clear All Filters
      </Button>

      <Button variant="default" onClick={handleCreateClick}>
        Создать
      </Button>
    </div>
  );
}
export default FilterAndCreate;
