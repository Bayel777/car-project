// // UserContext.tsx

// import {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   ReactNode,
// } from "react";

// export type Car = {
//   id: number;
//   model: string;
//   price: string;
//   year: string;
//   country: string;
// };

// type UserContextType = {
//   name: string;
//   setName: (name: string) => void;
//   cars: Car[];
//   fetchCars: () => Promise<void>;
//   deleteCar: (id: number) => Promise<void>;
//   updateCar: (car: Car) => Promise<void>;
//   successMessage: string;
//   setSuccessMessage: (msg: string) => void;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// const API_URL = "https://3d5ba0f67e86c782.mokky.dev/car";

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [name, setName] = useState("");
//   const [cars, setCars] = useState<Car[]>([]);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     const storedName = sessionStorage.getItem("userName");
//     if (storedName) setName(storedName);
//   }, []);

//   const handleSetName = (newName: string) => {
//     setName(newName);
//     sessionStorage.setItem("userName", newName);
//   };

//   const fetchCars = async () => {
//     try {
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error("Ошибка загрузки данных");
//       const data: Car[] = await res.json();
//       if (Array.isArray(data)) setCars(data);
//     } catch (err) {
//       console.error("Ошибка при получении данных с сервера:", err);
//     }
//   };

//   const deleteCar = async (id: number) => {
//     try {
//       const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error(`Ошибка удаления: ${res.status}`);
//       setCars((prevCars) => prevCars.filter((car) => car.id !== id));
//     } catch (err) {
//       console.error("Ошибка при удалении машины:", err);
//       throw err;
//     }
//   };

//   const updateCar = async (updatedCar: Car) => {
//     try {
//       const res = await fetch(`${API_URL}/${updatedCar.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedCar),
//       });
//       if (!res.ok) throw new Error(`Ошибка обновления: ${res.status}`);
//       const result: Car = await res.json();
//       setCars((prevCars) =>
//         prevCars.map((car) => (car.id === updatedCar.id ? result : car))
//       );
//     } catch (err) {
//       console.error("Ошибка при обновлении машины:", err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         name,
//         setName: handleSetName,
//         cars,
//         fetchCars,
//         deleteCar,
//         updateCar,
//         successMessage,
//         setSuccessMessage,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUser must be used within UserProvider");
//   return context;
// };
// src/store/UserContext.tsx
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import type { Car } from "./carService";
import { fetchCarsAPI, deleteCarAPI, updateCarAPI } from "./carService";

export type UserContextType = {
  name: string;
  setName: (name: string) => void;
  cars: Car[];
  fetchCars: () => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;
  successMessage: string;
  setSuccessMessage: (msg: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Сохраняем имя в sessionStorage
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
