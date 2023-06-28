import CarRent from "../models/car.rent.models.js";
import axios from 'axios';

export const getCars = async (req, res) => {
  try {
    const carsRent = await CarRent.find().lean().exec()
    res.json(carsRent);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos en renta, disculpa." });
  }
};
  
// Esta funcion hace que puedas obtener los autos del usuario.
export const getMyCars = async (req, res) => {
  try {
    const carsRent = await CarRent.find({user:req.user.id}).lean().exec()
    res.json(carsRent);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};
  
// Esta funcion hace que puedas obtener un auto en especifico del usuario.
export const getCar = async (req, res) => {
  try {
    const carRentId = req.params.id;
    const carRent = await CarRent.findById(carRentId).lean().exec();

    if (!carRent) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    res.json(carRent);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el auto' });
    console.log(error);
  }
};
  
// Esta funcion hace que puedas crea un auto.
export const createCar = async (req, res ) => {
  try { 
    const { brand, model, year, license_plate_number, color, price, description, transmission, fuel, seats, engine, mileage} = req.body;         
    const newCarRent = new CarRent({ 
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
      newCarRent.setImgUrl(filename);
    }
    const savedCarRent = await newCarRent.save();
    res.status(200).json(savedCarRent);
  } catch (error) {
    res.status(510).json({ error: 'No se pudo crear el auto' });
    console.log(error)
  }
};
  
// Esta funcion hace que puedas actualizes un auto.
export const updateCar = async (req, res) => {
  try { 
    const carRentId = req.params.id;
    const { brand,  model, year, license_plate_number, color,  price, description, transmission, fuel, seats , engine, mileage} = req.body;

    const updatedCarRent = await CarRent.findByIdAndUpdate(
      carRentId,
      { brand,  model, year, license_plate_number, color,  price, description, transmission, fuel, seats , engine, mileage},
      { new: true }
    );

    if (!updatedCarRent) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Verifica si se proporcionó una nueva imagen y guarda la URL de la nueva imagen
    if (req.file) {
      const { filename } = req.file;
      updatedCarRent.setImgUrl(filename);
      await updatedCarRent.save();
    }

    res.json(updatedCarRent);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el auto' });
    console.log(error);
  }
};
  
  // Esta funcion hace que puedas elimines un auto.
export const deleteCar = async (req, res) => {
  try {
    const carRentId = req.params.id;
    const deletedCarRent = await CarRent.findByIdAndDelete(carRentId);

    if (!deletedCarRent) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Elimina la imagen asociada al auto si existe
    if (deletedCarRent.imgUrl) {
      const imageUrl = deletedCarRent.imgUrl;
      await axios.delete(imageUrl); // Envía una solicitud DELETE al servidor para eliminar la imagen
    }

    res.json({ message: 'Auto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el auto' });
    console.log(error);
  }
}; 

export const getFavorites = async (req, res) => {
  try {
    const carsFavorites = await CarRent.find({user:req.user.id}).lean().exec()
    res.json(carsFavorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudieron obtener el auto" });
  }

};

export const addFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar el automóvil por su ID
    const carRent = await CarRent.findById(id);
    
    if (!carRent) {
      return res.status(404).json({ error: 'Automóvil no encontrado' });
    }

    // Verificar si el automóvil ya está marcado como favorito
    if (carRent.isFavorite) {
      return res.status(400).json({ error: 'El automóvil ya está marcado como favorito' });
    }

    // Marcar el automóvil como favorito
    carRent.isFavorite = true;
    
    // Guardar los cambios en la base de datos
    await carRent.save();

    res.status(200).json({ message: 'Automóvil marcado como favorito' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al marcar el automóvil como favorito' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el automóvil por su ID
    const carRent = await CarRent.findById(id);

    if (!carRent) {
      return res.status(404).json({ error: 'Automóvil no encontrado' });
    }

    // Verificar si el automóvil no está marcado como favorito
    if (!carRent.isFavorite) {
      return res.status(400).json({ error: 'El automóvil no está marcado como favorito' });
    }

    // Desmarcar el automóvil como favorito
    carRent.isFavorite = false;

    // Guardar los cambios en la base de datos
    await carRent.save();

    res.status(200).json({ message: 'Automóvil eliminado de favoritos' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar el automóvil de favoritos' });
  }
};
