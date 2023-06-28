import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { getCars, getCar, createCar, deleteCar, updateCar, getMyCars, getFavorites, addFavorite, removeFavorite} from "../controllers/cars.sale.controller.js";
import upload from "../libs/storage.js";

const router = Router();

router.get('/cars-sale', authRequired, getCars );

router.get('/my-cars-sale', authRequired, getMyCars );

router.get('/cars-sale/:id', authRequired, getCar);

router.get('/cars-sale/favorites', authRequired, getFavorites);

router.post('/cars-sale', authRequired,upload.single('image'), createCar);

router.post('/cars-sale/favorites/:id', authRequired,upload.single('image'), addFavorite);

router.delete('/cars-sale/:id', authRequired, deleteCar);

router.delete('/cars-sale/favorites/:id', authRequired, removeFavorite);

router.put('/cars-sale/:id', authRequired,upload.single('image'), updateCar);

export default router;