import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createdAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
export const register = async (req, res) => {
    const { username, firstname, lastname, dni, birth_date, company_name, ruc, email, address, cell_phone, password } = req.body
    try {
        const userFound = await User.findOne({
            $or: [
              { email },
              { dni },
              { company_name },
              { ruc },
              { cell_phone }
            ]
          });      
          if (userFound) {
            let errors = [];
            if (userFound.email === email) {
              errors.push("The email is already in use");
            }
            if (userFound.dni === dni) {
              errors.push("The DNI is already in use");
            }
            if (userFound.company_name === company_name) {
              errors.push("The company name is already in use");
            }
            if (userFound.ruc === ruc) {
              errors.push("The RUC is already in use");
            }
            if (userFound.cell_phone === cell_phone) {
              errors.push("The cell phone number is already in use");
            }
            
            if (errors.length > 0) {
              return res.status(400).json(errors);
            }
          }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            firstname,
            lastname,
            dni, 
            birth_date, 
            company_name, 
            ruc,
            email,
            address, 
            cell_phone,
            password:passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createdAccessToken({id: userSaved._id});
        res.cookie('token', token)
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            firstname: userSaved.firstname,
            lastname: userSaved.lastname,
            dni: userSaved.dni, 
            birth_date: userSaved.birth_date, 
            company_name: userSaved.company_name, 
            ruc: userSaved.ruc,
            email: userSaved.email,
            address: userSaved.address,
            cell_phone: userSaved.cell_phone,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found"});


        const isMatch = await bcrypt.compare(password, userFound.password);
        
        if (!isMatch) return res.status(400).json({ message: "Invalid password"});

        const token = await createdAccessToken({id: userFound._id});

        res.cookie('token', token);

        res.json({
            id: userFound.id,
            username: userFound.username,
            firstname: userFound.firstname,
            lastname: userFound.lastname,
            dni: userFound.dni, 
            birth_date: userFound.birth_date, 
            company_name: userFound.company_name, 
            ruc: userFound.ruc,
            email: userFound.email,
            address: userFound.address,
            cell_phone: userFound.cell_phone,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout =  (req, res) => {
    res.cookie('token', "", {
    expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {

    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: " Username not found"});
    
    res.json({
        id: userFound.id,
        username: userFound.username,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        dni: userFound.dni, 
        birth_date: userFound.birth_date, 
        company_name: userFound.company_name, 
        ruc: userFound.ruc,
        email: userFound.email,
        address: userFound.address,
        cell_phone: userFound.cell_phone,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: "Unauthorized "});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if (err) return res.status(401).json({ message: "Unauthorized "});

        const userFound = await User.findById(user.id)

        if (!userFound) return res.status(401).json({ message: "Unauthorized "});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};