import Car from "../models/car.models.js";
import multer from "multer";
import uploadImage from '../middlewares/uploadImage.js';
import fs from 'fs';
import path from 'path';

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id }).populate("user");

    const carsWithImageURL = cars.map((car) => {
      const imageURL = car.image
        ? `${req.protocol}://${req.get("host")}/${car.image}`
        : null;
      return { ...car._doc, image: imageURL };
    });

    res.json(carsWithImageURL);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener los autos" });
  }
};

export const createCar = async (req, res ) => {
    try {
        uploadImage(req, res, async (err) => {

            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: err.message });
            } else if (err) {
                return res.status(500).json({ error: 'No se pudo subir la imagen' });
            }
            

        const { model, brand, description, price } = req.body;
        const imagePath = req.file.path;
        console.log(req.user);
        const newCar = new Car({
            model,
            brand,
            description,
            price,
            image: imagePath,
            user: req.user.id
        });

        const savedCar = await newCar.save();
        res.status(201).json(savedCar);

    });

    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear el auto' });
    }
};

export const getCar = async (req, res ) => {
    try {

        const car = await Car.findById(req.params.id).populate('user');
    
        if (!car) {
            return res.status(404).json({ error: 'No se encontró el auto' });
        }
        
        const carsImage = {
            ...car._doc,
            image: car.image
            ? `${req.protocol}://${req.get('host')}/uploads/${car.image}`
            : null
        };
        
        res.json(carsImage);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el auto' });
    }
};

export const updateCar = async (req, res) => {
    try {
      uploadImage(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
        } else if (err) {
          return res.status(500).json({ error: 'No se pudo subir la imagen' });
        }
  
        const { model, brand, description, price } = req.body;
        const imagePath = req.file ? req.file.path : null;
  
        const previousCar = await Car.findById(req.params.id);
  
        // Verificar si hay una imagen anterior y si es diferente de la nueva imagen
        if (previousCar.image && previousCar.image !== imagePath) {
          const previousImagePath = path.join('', previousCar.image);
  
          // Verificar si el archivo existe antes de intentar eliminarlo
          if (fs.existsSync(previousImagePath)) {
            fs.unlinkSync(previousImagePath);
            console.log('Imagen anterior eliminada:', previousImagePath);
          } else {
            console.log('La imagen anterior no existe:', previousImagePath);
          }
        }
  
        const updatedCar = await Car.findByIdAndUpdate(
          req.params.id,
          {
            model,
            brand,
            description,
            price,
            image: imagePath,
          },
          { new: true }
        );
  
        if (!updatedCar) {
          return res.status(404).json({ error: 'Auto no encontrado' });
        }
  
        const updatedCarWithImage = {
          ...updatedCar._doc,
          image: updatedCar.image
            ? `${req.protocol}://${req.get('host')}/uploads/${updatedCar.image}`
            : null,
        };
  
        res.json(updatedCarWithImage);
      });
    } catch (error) {
      console.error('Error al actualizar el auto:', error);
      res.status(500).json({ error: 'Error al actualizar el auto' });
    }
  };

export const deleteCar = async (req, res) => {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
  
      if (!car) {
        return res.status(404).json({ error: 'No se encontró el auto' });
      }
  
      if (car.image) {
        const imagePath = path.join('', car.image);
        
        // Verificar si el archivo existe antes de intentar eliminarlo
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log('Imagen eliminada:', imagePath);
        } else {
          console.log('El archivo de imagen no existe:', imagePath);
        }
      }
  
      res.json({ message: 'Auto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar el auto:', error);
      res.status(500).json({ error: 'Error al eliminar el auto' });
    }
  };