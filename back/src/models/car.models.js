import mongoose from "mongoose";

import { config } from '../settings.js';

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

carSchema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = config.appConfig;
    this.image = `${host}:${port}/uploads/img/${filename}`;
   
};

export default mongoose.model("Car", carSchema);