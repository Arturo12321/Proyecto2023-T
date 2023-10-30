import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import carSaleRoutes from "./routes/cars.rent.routes.js";
import carRentRoutes from "./routes/cars.sale.routes.js";
import officeRoutes from "./routes/offices.routes.js";
import mercadopago from 'mercadopago';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}

));

mercadopago.configure({
    access_token: "",
});
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const publicFolderPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(publicFolderPath));
app.use('/api', authRoutes);
app.use('/api', carSaleRoutes);
app.use('/api', carRentRoutes);
app.use('/api', officeRoutes);

app.post('/create-reference',  (req, res) => {
    let preference = {
        items: [
            {
            title: req.body.title,
            unit_price: Number(req.body.price),
            quantify: Number(req.body.quantify),
            },
        ],
        back_urls:{
            success: "http://localhost:5173/cars-rent",
            failure: "http://localhost:5173/cars-rent",
            pending: "Failed to create",
        },
        auto_return: "approved"
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id,
            });
        })
            .catch(function(error){
                console.log(error);
    });
});

export default app;