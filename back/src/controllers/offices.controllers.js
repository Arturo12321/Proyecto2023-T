import Office from "../models/office.models.js";
import axios from 'axios';

// Esta funcion hace que puedas obtener los autos de todas los usuarios en general.
export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find().lean().exec()
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las oficinas" });
  }
};

// Esta funcion hace que puedas obtener los autos del usuario.
export const getMyOffices = async (req, res) => {
  try {
    const offices = await Office.find({user:req.user.id}).lean().exec()
    res.json(offices);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las oficinas" });
  }
};

// Esta funcion hace que puedas obtener un auto en especifico del usuario.
export const getOffice = async (req, res) => {
  try {
    const officeId = req.params.id;
    const office = await Office.findById(officeId).lean().exec();

    if (!office) {
      return res.status(404).json({ error: 'La oficina no existe' });
    }
    res.json(office);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener la oficina' });
    console.log(error);
  }
};

// Esta funcion hace que puedas crea un auto.
export const createOffice = async (req, res ) => {
    try { 
        const { name, address, city, country, phone, email,  latitude, longitude } = req.body;
        const newOffice = new Office({
          name, 
          address, 
          city, 
          country, 
          phone, 
          email,  
          latitude, 
          longitude
        });

        if (req.file) {
          const { filename } = req.file;
          newOffice.setImgUrl(filename);
        }

        const savedOffice = await newOffice.save();
        res.status(201).json(savedOffice);

    } catch (error) {
        res.status(500).json({ error: 'No se pudo crear la oficina' });
        console.log(error)
    }
};

// Esta funcion hace que puedas actualizes un auto.
export const updateOffice = async (req, res) => {
  try {
    const officeId = req.params.id;
    const { name, address, city, country, phone, email,  latitude, longitude } = req.body;


    const updatedOffice = await Office.findByIdAndUpdate(
      officeId,
      { name, address, city, country, phone, email,  latitude, longitude },
      { new: true }
    );

    if (!updatedOffice) {
      return res.status(404).json({ error: 'La oficina no existe' });
    }

    // Verifica si se proporcionó una nueva imagen y guarda la URL de la nueva imagen
    if (req.file) {
      const { filename } = req.file;
      updatedOffice.setImgUrl(filename);
      await updatedOffice.save();
    }

    res.json(updatedOffice);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la oficina' });
    console.log(error);
  }
};

// Esta funcion hace que puedas elimines un auto.
export const deleteOffice = async (req, res) => {
  try {
    const officeId = req.params.id;
    const deletedOffice = await Office.findByIdAndDelete(officeId);

    if (!deletedOffice) {
      return res.status(404).json({ error: 'La oficina no existe' });
    }

    // Elimina la imagen asociada al auto si existe
    if (deletedOffice.imgUrl) {
      const imageUrl = deletedOffice.imgUrl;
      await axios.delete(imageUrl); // Envía una solicitud DELETE al servidor para eliminar la imagen
    }

    res.json({ message: 'Oficina eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el oficina' });
    console.log(error);
  }
};  