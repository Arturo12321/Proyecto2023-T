/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */


import { createContext, useContext, useState } from "react";

import { createCarRequest, getCarsRequest  } from "../api/cars";

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
            const response = await getCarsRequest();
            const getCars = response.data;
            setCars(getCars);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };


    const createCar = async (car) => {
        try {
          const response = await createCarRequest(car);
          const newCar = response.data;
          setCars((prevCars) => [...prevCars, newCar]);
          console.log(response);
        } catch (error) {
          console.error("Error creating car:", error);
        }
    };

    return (
        <CarsContext.Provider 
            value={{
                cars,
                createCar,
                getCars,
            }}>
            {children}
        </CarsContext.Provider>
    );
}

export default CarsContext;