import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Car } from "@/store/UserContext";
import { useUser } from "@/store/UserContext";

const initialCarState: Omit<Car, "id"> = {
  model: "",
  price: "",
  year: "",
  country: "",
};

const fieldDetails: {
  [key: string]: { label: string; placeholder: string };
} = {
  model: { label: "Модель", placeholder: "Audi" },
  price: { label: "Цена", placeholder: "450$" },
  year: { label: "Год", placeholder: "2019" },
  country: { label: "Страна", placeholder: "Германия" },
};

export default function CreateCarModal() {
  const navigate = useNavigate();

  const { addCar, setSuccessMessage } = useUser();

  const [car, setCar] = useState<Omit<Car, "id">>(initialCarState);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCar((prev) => ({ ...prev, [id as keyof Omit<Car, "id">]: value }));
  };

  const handleCreate = async () => {
    if (!car.model || !car.price || !car.year || !car.country) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    setIsSaving(true);
    try {
      await addCar(car);
      setSuccessMessage("Машина создана!");
      navigate("/cars");
    } catch (err) {
      console.error("Ошибка при создании:", err);
      alert("Не удалось создать машину");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 pt-20 relative z-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4">
          {Object.keys(fieldDetails).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {fieldDetails[field].label}
              </label>
              <Input
                id={field}
                value={(car as any)[field]}
                onChange={handleChange}
                type="text"
                placeholder={fieldDetails[field].placeholder}
              />
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isSaving}
            >
              {isSaving ? "Создаём..." : "Создать"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
