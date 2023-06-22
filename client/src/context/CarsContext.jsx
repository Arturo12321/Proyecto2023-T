/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */


import { createContext, useContext, useState } from "react";

import { createCarRequest, getCarsRequest, deleteCarRequest, getCarRequest, updateCarRequest  } from "../api/cars";

const CarsContext = createContext();

export const useCars = () => {
    const context = useContext(CarsContext);

    if (!context) {
        throw new Error("UseCars must be used withhin a CarProvider");
    }
    return context;
};

export function CarProvider({ children }) {

  const [cars, setCars] = useState([]);


  const getCars = async () => {
    try {
      const res = await getCarsRequest();
      const cars = res.data;
      setCars(cars);
      console.log(cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const getCar = async (id) => {
    try {
      const res = await getCarRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createCar = async (car) => {
    try {
      const res = await createCarRequest(car);
      const newCar = res.data;
      setCars((prevCars) => [...prevCars, newCar]);
      console.log(res);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const updateCar = async (id, car) => {
    try {
      const res = await updateCarRequest(id, car);
      const updatedCar = res.data;
      setCars((prevCars) =>
        prevCars.map((c) => (c._id === updatedCar._id ? updatedCar : c))
      );
    } catch (error) {
      console.log("Error updating car:", error);
    }
  };


  const deleteCar = async (id) => {
    try {
      const res = await deleteCarRequest(id);
      if (res.status === 200) setCars(cars.filter((car) => car._id !== id));
      
    } catch (error) {
      console.log("Error deleting car:", error);
    }
  };



    return (
        <CarsContext.Provider 
            value={{
                cars,
                createCar,
                getCars,
                updateCar,
                getCar,
                deleteCar,
            }}>
            {children}
        </CarsContext.Provider>
    );
}

export default CarsContext;