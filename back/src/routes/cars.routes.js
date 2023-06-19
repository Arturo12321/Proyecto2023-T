import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCars, getCar, createCar, deleteCar, updateCar } from "../controllers/cars.controller.js";


const router = Router();

router.get('/cars', authRequired, getCars );

router.get('/cars/:id', authRequired, getCar);

router.post('/cars', authRequired, createCar);

router.delete('/cars/:id', authRequired, deleteCar);

router.put('/cars/:id', authRequired, updateCar);

export default router;