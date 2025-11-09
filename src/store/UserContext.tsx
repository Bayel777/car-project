import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import type { Car, CreateCarData } from "./CarService";
import {
  fetchCarsAPI,
  deleteCarAPI,
  updateCarAPI,
  createCarAPI,
} from "./CarService";
// ...

export type UserContextType = {
  name: string;
  setName: (name: string) => void;
  cars: Car[];
  fetchCars: () => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;

  addCar: (carData: CreateCarData) => Promise<void>;
  successMessage: string;
  setSuccessMessage: (msg: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  const handleSetName = (newName: string) => {
    setName(newName);
    sessionStorage.setItem("userName", newName);
  };

  const fetchCars = async () => {
    const data = await fetchCarsAPI();
    if (data) setCars(data);
  };

  const deleteCar = async (id: number) => {
    await deleteCarAPI(id);
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const updateCar = async (car: Car) => {
    const updated = await updateCarAPI(car);
    setCars((prev) => prev.map((c) => (c.id === car.id ? updated : c)));
  };

  const addCar = async (carData: CreateCarData) => {
    const newCar = await createCarAPI(carData);

    setCars((prev) => [...prev, newCar]);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <UserContext.Provider
      value={{
        name,
        setName: handleSetName,
        cars,
        fetchCars,
        deleteCar,
        updateCar,
        addCar,
        successMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
