import axios from "./axios";

export const getCarsRentRequest = () => axios.get("/cars-rent");

export const getMyCarsRentRequest = () => axios.get("/my-cars-rent");

export const getCarRentRequest = (id) => axios.get(`/cars-rent/${id}`);

export const createCarRentRequest = (carRent) => {
    const formData = new FormData();
    formData.append("brand", carRent.brand);
    formData.append("model", carRent.model);
    formData.append("year", carRent.year);
    formData.append("image", carRent.image);
    formData.append("license_plate_number", carRent.license_plate_number);
    formData.append("color", carRent.color);
    formData.append("price", carRent.price);
    formData.append("description", carRent.description);
    formData.append("transmission", carRent.transmission);
    formData.append("fuel", carRent.fuel);
    formData.append("seats", carRent.seats);
    formData.append("engine", carRent.engine);
    formData.append("mileage", carRent.mileage);

    return axios.post("/cars-rent", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateCarRentRequest = (id, carRent) => {
    const formData = new FormData();
    formData.append("brand", carRent.brand);
    formData.append("model", carRent.model);
    formData.append("year", carRent.year);
    formData.append("image", carRent.image);
    formData.append("license_plate_number", carRent.license_plate_number);
    formData.append("color", carRent.color);
    formData.append("price", carRent.price);
    formData.append("description", carRent.description);
    formData.append("transmission", carRent.transmission);
    formData.append("fuel", carRent.fuel);
    formData.append("seats", carRent.seats);
    formData.append("engine", carRent.engine);
    formData.append("mileage", carRent.mileage);

    return axios.put(`/cars-rent/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteCarRentRequest = (id) => axios.delete(`/cars-rent/${id}`);


