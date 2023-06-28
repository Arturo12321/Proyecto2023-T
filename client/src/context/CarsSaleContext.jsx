/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import { createCarSaleRequest, getCarsSaleRequest, getMyCarsSaleRequest, deleteCarSaleRequest, getCarSaleRequest, updateCarSaleRequest } from "../api/carsSale";

const CarSaleContext = createContext();

export const useCarsSale = () => {
    const context = useContext(CarSaleContext);

    if(!context) {
        throw new Error("useCarsRent must be used within a CarSaleContext");
    }

    return context;
}

export function CarSaleProvider ( {  children }) {

    const [carsSale, setCarsSale ] = useState([]);

    const createCarSale = async(carSale) => {
        try {
            const res = await createCarSaleRequest(carSale);
            const newCarSale = res.data;
            setCarsSale((prevCarsSale) => [...prevCarsSale, newCarSale]);
            console.log(res);
          } catch (error) {
            console.error("Error creating car for sale:", error);
          }
    };

    const getCarsSale = async() => {
        try {
            const res =  await getCarsSaleRequest()
            const carsSale = res.data;
            setCarsSale(carsSale);
            console.log(carsSale);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const getCarSale = async(id) => {
        try {
            const res = await getCarSaleRequest(id);
            const carSale = res.data;
            return carSale;
        } catch (error) {
            console.log(error)
        }
    };

    const getMyCarsSale = async() => {
        try {
            const res =  await getMyCarsSaleRequest()
            const myCarsSale = res.data;
            setCarsSale(myCarsSale);
            console.log(myCarsSale);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const deleteCarSale = async(id) => {
        try {
            const res = await deleteCarSaleRequest(id);
            if (res.status === 200) setCarsSale(carsSale.filter((carSale) => carSale._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateCarSale = async(id, carSale) => {
        try {
            const res = await updateCarSaleRequest(id, carSale);
            const updateCarSale = res.data;
            setCarsSale((prevCarsSale) =>
                prevCarsSale.map((c) => (c._id === updateCarSale._id ? updateCarSale : c))
            );
        } catch (error) {
            console.log("Error updating car:", error);
        }
    };

    return (
        <CarSaleContext.Provider 
            value={{
                carsSale,
                createCarSale,
                getCarsSale,
                getMyCarsSale,
                deleteCarSale,
                getCarSale,
                updateCarSale
            }}>
            {children}
        </CarSaleContext.Provider>
    );
}

export default CarSaleContext;