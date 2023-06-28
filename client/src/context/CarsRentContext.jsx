/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import { createCarRentRequest, getCarsRentRequest, getMyCarsRentRequest, deleteCarRentRequest, getCarRentRequest, updateCarRentRequest } from "../api/carsRent";

const CarRentContext = createContext();

export const useCarsRent = () => {
    const context = useContext(CarRentContext);

    if(!context) {
        throw new Error("useCarsRent must be used within a CarsRentContext");
    }

    return context;
}

export function CarRentProvider ( {  children }) {

    const [carsRent, setCarsRent ] = useState([]);

    const createCarRent = async(carRent) => {
        try {
            const res = await createCarRentRequest(carRent);
            const newCarRent = res.data;
            setCarsRent((prevCarsRent) => [...prevCarsRent, newCarRent]);
            console.log(res);
          } catch (error) {
            console.error("Error creating car for rent:", error);
          }
    };

    const getCarsRent = async() => {
        try {
            const res =  await getCarsRentRequest()
            const carsRent = res.data;
            setCarsRent(carsRent);
            console.log(carsRent);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const getCarRent = async(id) => {
        try {
            const res = await getCarRentRequest(id);
            const carRent = res.data;
            return carRent;
        } catch (error) {
            console.log(error);
        }
    };

    const getMyCarsRent = async() => {
        try {
            const res =  await getMyCarsRentRequest()
            const myCarsRent = res.data;
            setCarsRent(myCarsRent);
            console.log(myCarsRent);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const deleteCarRent = async(id) => {
        try {
            const res = await deleteCarRentRequest(id);
            if (res.status === 200) setCarsRent(carsRent.filter((carRent) => carRent._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    
    const updateCarRent = async(id, carRent) => {
        try {
            const res = await updateCarRentRequest(id, carRent);
            const updateCarRent = res.data;
            setCarsRent((prevCarsRent) =>
                prevCarsRent.map((c) => (c._id === updateCarRent._id ? updateCarRent : c ))
            );
        } catch (error) {
            console.log("Error updating car:", error);
        }
    };
    
    return (
        <CarRentContext.Provider 
            value={{
                carsRent,
                createCarRent,
                getCarsRent,
                getMyCarsRent,
                deleteCarRent,
                getCarRent,
                updateCarRent,
            }}>
            {children}
        </CarRentContext.Provider>
    );
}

export default CarRentContext;