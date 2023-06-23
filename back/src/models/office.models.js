import mongoose from "mongoose";

import { config } from '../settings.js';

const officeSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    
    image: {
        type: String,
        required: true
    }  
}, {
    timestamps: true
});

officeSchema.methods.setImgUrl = function setImgUrl(filename) {
    const { host, port } = config.appConfig;
    this.image = `${host}:${port}/uploads/img/${filename}`;
   
};

export default mongoose.model("Office", officeSchema);