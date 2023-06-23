import { Router } from "express";

import { authRequired } from "../middlewares/validateToken.js";
import { getOffices, getMyOffices, getOffice, createOffice, deleteOffice, updateOffice } from "../controllers/offices.controllers.js";
import upload from "../libs/storage.js";

const router = Router();

router.get('/offices', authRequired, getOffices );

router.get('/my-offices', authRequired, getMyOffices);

router.get('/offices/:id', authRequired, getOffice);

router.post('/offices', authRequired,upload.single('image'), createOffice);

router.delete('/offices/:id', authRequired, deleteOffice);

router.put('/offices/:id', authRequired,upload.single('image'), updateOffice);

export default router;