/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react";
import { getOfficesRequest, getMyOfficesRequest, getOfficeRequest, createOfficeRequest, updateOfficeRequest, deleteOfficeRequest } from "../api/offices";

const OfficeContext = createContext();

export const useOffices = () => {
    const context = useContext(OfficeContext);

    if(!context) {
        throw new Error("useOffices must be used within a OfficesContext");
    }

    return context;
}

export function OfficeProvider ( {  children }) {

    const [offices, setOffices ] = useState([]);

    const createOffice = async(office) => {
        try {
            const res = await createOfficeRequest(office);
            const newOffice = res.data;
            setOffices((prevOffices) => [...prevOffices, newOffice]);
            console.log(res);
          } catch (error) {
            console.error("Error creating office:", error);
          }
    };

    const getOffices = async() => {
        try {
            const res =  await getOfficesRequest()
            const offices = res.data;
            setOffices(offices);
            console.log(offices);
        } catch (error) {
            console.error("Error fetching offices:", error);
        }
    };

    const getOffice= async(id) => {
        try {
            const res = await getOfficeRequest(id);
            const office = res.data;
            return office;
        } catch (error) {
            console.log(error)
        }
    };

    const getMyOffices = async() => {
        try {
            const res =  await getMyOfficesRequest()
            const myOffices = res.data;
            setOffices(myOffices);
            console.log(myOffices);
        } catch (error) {
            console.error("Error fetching offices:", error);
        }
    };

    const deleteOffice = async(id) => {
        try {
            const res = await deleteOfficeRequest(id);
            if (res.status === 200) setOffices(offices.filter((office) => office._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateOffice = async(id, office) => {
        try {
            const res = await updateOfficeRequest(id, office);
            const updateOffice = res.data;
            setOffices((prevOffices) =>
                prevOffices.map((c) => (c._id === updateOffice._id ? updateOffice : c))
            );
        } catch (error) {
            console.log("Error updating office:", error);
        }
    };

    return (
        <OfficeContext.Provider 
            value={{
                offices,
                createOffice,
                getOffices,
                getMyOffices,
                deleteOffice,
                getOffice,
                updateOffice
            }}>
            {children}
        </OfficeContext.Provider>
    );
}

export default OfficeContext;