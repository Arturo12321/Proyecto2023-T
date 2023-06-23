import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { getCars, getCar, createCar, deleteCar, updateCar, getMyCars } from "../controllers/cars.rent.controller.js";
import upload from "../libs/storage.js";

const router = Router();

router.get('/cars-rent', authRequired, getCars);

router.get('/my-cars-rent', authRequired, getMyCars);

router.get('/cars-rent/:id', authRequired, getCar);

router.post('/cars-rent', authRequired,upload.single('image'), createCar);

router.delete('/cars-rent/:id', authRequired, deleteCar);

router.put('/cars-rent/:id', authRequired,upload.single('image'), updateCar);

export default router;