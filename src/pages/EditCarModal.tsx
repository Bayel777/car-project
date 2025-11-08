import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert, AlertTitle } from "@/components/ui/Alert";
import { useUser } from "@/store/UserContext";

type Car = {
  id: number;
  model: string;
  price: string;
  year: string;
  country: string;
};

export default function EditCarModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, updateCar, fetchCars,  } = useUser();

  const [car, setCar] = useState<Car | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Находим машину по ID из контекста
  useEffect(() => {
    const found = cars.find((c) => c.id === Number(id));
    if (found) setCar(found);
  }, [cars, id]);

  if (!car) {
    return (
      <p className="text-center mt-10 text-gray-600">Машина не найдена.</p>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCar((prev) => (prev ? { ...prev, [id]: value } : prev));
  };

  const handleSave = async () => {
    if (!car) return;
    setIsSaving(true);

    try {
      // 🔹 Обновляем через контекст
      await updateCar(car);

      // 🔹 Перезагружаем список машин
      await fetchCars();

      // 🔹 Устанавливаем глобальное сообщение об успехе
      

      // 🔹 Показываем локальный алерт (если хочешь анимацию)
      setSuccess(true);

      // 🔹 Через 2 секунды возвращаем на /cars
      setTimeout(() => navigate("/cars"), 2000);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      alert("Не удалось обновить данные");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Редактировать: {car.model}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1">
              Модель
            </label>
            <Input id="model" value={car.model} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Цена
            </label>
            <Input id="price" value={car.price} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1">
              Год
            </label>
            <Input id="year" value={car.year} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Страна
            </label>
            <Input id="country" value={car.country} onChange={handleChange} />
          </div>

          <Button
            className="w-full mt-3"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Сохраняем..." : "Сохранить изменения"}
          </Button>

          {success && (
            
              <AlertTitle>Машина успешно обновлена!</AlertTitle>
            
          )}
        </CardContent>
      </Card>
    </div>
  );
}
