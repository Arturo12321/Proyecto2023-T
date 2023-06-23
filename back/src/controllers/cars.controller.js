import Car from "../models/car.models.js";
import axios from 'axios';

// Esta funcion hace que puedas obtener los autos de todas los usuarios en general.
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().lean().exec()
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};

// Esta funcion hace que puedas obtener los autos del usuario.
export const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({user:req.user.id}).lean().exec()
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};

// Esta funcion hace que puedas obtener un auto en especifico del usuario.
export const getCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId).lean().exec();

    if (!car) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el auto' });
    console.log(error);
  }
};

// Esta funcion hace que puedas crea un auto.
export const createCar = async (req, res ) => {
    try { 
        const { model, brand, description, price } = req.body;
        const newCar = new Car({
            model,
            brand,
            description,
            price,
            user: req.user.id
        });

        if (req.file) {
          const { filename } = req.file;
          newCar.setImgUrl(filename);
        }

        const savedCar = await newCar.save();
        res.status(201).json(savedCar);

    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el auto' });
        console.log(error)
    }
};

// Esta funcion hace que puedas actualizes un auto.
export const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const { model, brand, description, price } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { model, brand, description, price },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Verifica si se proporcionó una nueva imagen y guarda la URL de la nueva imagen
    if (req.file) {
      const { filename } = req.file;
      updatedCar.setImgUrl(filename);
      await updatedCar.save();
    }

    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el auto' });
    console.log(error);
  }
};

// Esta funcion hace que puedas elimines un auto.
export const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ error: 'El auto no existe' });
    }

    // Elimina la imagen asociada al auto si existe
    if (deletedCar.imgUrl) {
      const imageUrl = deletedCar.imgUrl;
      await axios.delete(imageUrl); // Envía una solicitud DELETE al servidor para eliminar la imagen
    }

    res.json({ message: 'Auto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el auto' });
    console.log(error);
  }
};  