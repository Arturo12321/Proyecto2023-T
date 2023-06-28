import mongoose from "mongoose";

import { config } from '../settings.js';

const car_rent_Schema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    license_plate_number: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    fuel: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

car_rent_Schema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = config.appConfig;
    this.image = `${host}:${port}/uploads/img/${filename}`;
   
};

export default mongoose.model("CarRent", car_rent_Schema);