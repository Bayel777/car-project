export type Car = {
  id: number;
  model: string;
  price: string;
  year: string;
  country: string;
};

export type CreateCarData = Omit<Car, "id">;

const API_URL = "https://3d5ba0f67e86c782.mokky.dev/car";

export const fetchCarsAPI = async (): Promise<Car[] | null> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Ошибка загрузки данных");
    const data: Car[] = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteCarAPI = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Ошибка удаления: ${res.status}`);
};

export const updateCarAPI = async (car: Car): Promise<Car> => {
  const res = await fetch(`${API_URL}/${car.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  if (!res.ok) throw new Error(`Ошибка обновления: ${res.status}`);
  return res.json();
};

export const createCarAPI = async (carData: CreateCarData): Promise<Car> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carData),
  });
  if (!res.ok) throw new Error(`Ошибка создания: ${res.status}`);
  return res.json();
};
