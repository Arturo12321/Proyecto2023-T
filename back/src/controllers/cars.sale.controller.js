import CarSale from "../models/car.sale.models.js";
import axios from 'axios';

export const getCars = async (req, res) => {
  try {
    const cars = await CarSale.find().lean().exec()
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};
  
// Esta funcion hace que puedas obtener los autos del usuario.
export const getMyCars = async (req, res) => {
  try {
    const carsSale = await CarSale.find({user:req.user.id}).lean().exec()
    res.json(carsSale);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};
  
// Esta funcion hace que puedas obtener un auto en especifico del usuario.
export const getCar = async (req, res) => {
  try {
    const carSaletId = req.params.id;
    const carSale = await CarSale.findById(carSaletId).lean().exec();

    if (!carSale) {
      return res.status(404).json({ error: 'El auto no existe' });
    }
    res.json(carSale);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el auto' });
    console.log(error);
  }
};
  
// Esta funcion hace que puedas crea un auto.
export const createCar = async (req, res ) => {
  try { 
    const { brand, model, year, license_plate_number, color, price, description, transmission, fuel, seats, engine, mileage} = req.body;         
    const newCarSale = new CarSale({ 
      brand, 
      model, 
      year, 
      license_plate_number, 
      color, 
      price, 
      description, 
      transmission, 
      fuel, 
      seats, 
      engine,
      mileage,
      user: req.user.id
    });
    if (req.file) {
      const { filename } = req.file;
      newCarSale.setImgUrl(filename);
    }
    const savedCarRent = await newCarSale.save();
    res.status(200).json(savedCarRent);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el auto' });
    console.log(error)
  }
};
  
// Esta funcion hace que puedas actualizes un auto.
export const updateCar = async (req, res) => {
  try { 
    const carSaleId = req.params.id;
    const { brand,  model, year, license_plate_number, color,  price, description, transmission, fuel, seats , engine, mileage} = req.body;

    const updatedCarSale = await CarSale.findByIdAndUpdate(
      carSaleId,
      { brand,  model, year, license_plate_number, color,  price, description, transmission, fuel, seats , engine, mileage},
      { new: true }
    );

    if (!updatedCarSale) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Verifica si se proporcionó una nueva imagen y guarda la URL de la nueva imagen
    if (req.file) {
      const { filename } = req.file;
      updatedCarSale.setImgUrl(filename);
      await updatedCarSale.save();
    }

    res.json(updatedCarSale);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el auto' });
    console.log(error);
  }
};
  
  // Esta funcion hace que puedas elimines un auto.
export const deleteCar = async (req, res) => {
  try {
    const carSaleId = req.params.id;
    const deletedCarSale = await CarSale.findByIdAndDelete(carSaleId);

    if (!deletedCarSale) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Elimina la imagen asociada al auto si existe
    if (deletedCarSale.imgUrl) {
      const imageUrl = deletedCarSale.imgUrl;
      await axios.delete(imageUrl); // Envía una solicitud DELETE al servidor para eliminar la imagen
    }

    res.json({ message: 'Auto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el auto' });
    console.log(error);
  }
}; 
