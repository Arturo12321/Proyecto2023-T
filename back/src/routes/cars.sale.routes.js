import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { getCars, getCar, createCar, deleteCar, updateCar, getMyCars } from "../controllers/cars.sale.controller.js";
import upload from "../libs/storage.js";

const router = Router();

router.get('/cars-sale', authRequired, getCars );

router.get('/my-cars-sale', authRequired, getMyCars );

router.get('/cars-sale/:id', authRequired, getCar);

router.post('/cars-sale', authRequired,upload.single('image'), createCar);

router.delete('/cars-sale/:id', authRequired, deleteCar);

router.put('/cars-sale/:id', authRequired,upload.single('image'), updateCar);

export default router;