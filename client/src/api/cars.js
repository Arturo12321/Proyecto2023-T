import axios from "./axios";

export const getCarsRequest = () => axios.get("/cars");

export const getCarRequest = (id) => axios.get(`/cars/${id}`);

export const createCarRequest = (car) => {
  const formData = new FormData();
  formData.append("model", car.model);
  formData.append("brand", car.brand);
  formData.append("description", car.description);
  formData.append("price", car.price);
  formData.append("image", car.image); // Aquí asumimos que `car.image` es el archivo seleccionado

  return axios.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCarRequest = (id, car) => {
  const formData = new FormData();
  formData.append("model", car.model);
  formData.append("brand", car.brand);
  formData.append("description", car.description);
  formData.append("price", car.price);
  formData.append("image", car.image); // Aquí asumimos que `car.image` es el archivo seleccionado

  return axios.put(`/cars/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",  
    },
  });
};


export const deleteCarRequest = (id) => axios.delete(`/cars/${id}`);
        

