import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { getCars, getCar, createCar, deleteCar, updateCar } from "../controllers/cars.controller.js";
import upload from "../libs/storage.js";

const router = Router();

router.get('/cars', authRequired, getCars );

router.get('/cars/:id', authRequired, getCar);

router.post('/cars', authRequired,upload.single('image'), createCar);

router.delete('/cars/:id', authRequired, deleteCar);

router.put('/cars/:id', authRequired,upload.single('image'), updateCar);

export default router;