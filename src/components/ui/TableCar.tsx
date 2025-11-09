

import type { Car } from "@/store/UserContext";
import { useUser } from "@/store/UserContext";
import Table from "./Table";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCarModal from "@/pages/DeleteCarModal";

export default function TableCar() {
 
  const { cars, deleteCar, setSuccessMessage } = useUser(); 
  const navigate = useNavigate();

  const [deletingCarId, setDeletingCarId] = useState<number | null>(null);

  const handleEdit = useCallback(
    (car: Car) => navigate(`/cars/edit/${car.id}`),
    [navigate]
  );

  const handleDeleteClick = useCallback(
    (id: number) => setDeletingCarId(id),
    []
  );

  const handleConfirmDelete = useCallback(async () => {
    if (deletingCarId === null) return;
    try {
      await deleteCar(deletingCarId);
    
      setSuccessMessage("Машина успешно удалена!"); 
    } catch {
      alert("Не удалось удалить машину");
    } finally {
      setDeletingCarId(null);
    }
  }, [deletingCarId, deleteCar, setSuccessMessage]); 

  const handleCloseModal = useCallback(() => setDeletingCarId(null), []);

  const carToDelete = cars.find((c) => c.id === deletingCarId);

  const renderCarRow = useCallback(
    (car: Car) => (
      <>
        <td className="p-4 text-center border-b">{car.id}</td>
        <td className="p-4 border-b">{car.model}</td>
        <td className="p-4 border-b">{car.price}</td>
        <td className="p-4 border-b">{car.year}</td>
        <td className="p-4 border-b">{car.country}</td>
      </>
    ),
    []
  );

  const renderCarActions = useCallback(
    (car: Car) => (
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => handleEdit(car)}
          className="text-blue-600 hover:bg-blue-100 p-2 rounded border"
        >
          ✏️
        </button>
        <button
          onClick={() => handleDeleteClick(car.id)}
          className="text-red-600 hover:bg-red-100 p-2 rounded border"
        >
          🗑️
        </button>
      </div>
    ),
    [handleEdit, handleDeleteClick]
  );

  if (!cars || cars.length === 0) {
    return <p className="p-4 text-center text-gray-500">Нет данных о машинах.</p>;
  }

  return (
    <>
      <Table<Car>
        data={cars}
        headers={["#", "Модель", "Цена", "Год", "Страна"]}
        renderRow={renderCarRow}
        renderActions={renderCarActions}
      />

      {deletingCarId !== null && carToDelete && (
        <DeleteCarModal
          modal={carToDelete.model}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}


