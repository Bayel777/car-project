import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { Car } from "@/store/UserContext";
import { useUser } from "@/store/UserContext";

export default function EditCarModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, updateCar, setSuccessMessage } = useUser();

  const [car, setCar] = useState<Car | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const found = cars.find((c) => c.id === Number(id));
    if (found) setCar(found);
  }, [cars, id]);

  if (!car)
    return (
      <p className="text-center mt-10 text-gray-600">Машина не найдена.</p>
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCar((prev) => (prev ? { ...prev, [id as keyof Car]: value } : prev));
  };

  const handleSave = async () => {
    if (!car) return;
    setIsSaving(true);
    try {
      await updateCar(car);
      setSuccessMessage("Машина успешно обновлена!");
      navigate("/cars");
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      alert("Не удалось обновить данные");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 pt-20 relative z-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-4">
          {["model", "price", "year", "country"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <Input
                id={field}
                value={(car as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button
            className="w-full mt-3"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Сохраняем..." : "Сохранить изменения"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
