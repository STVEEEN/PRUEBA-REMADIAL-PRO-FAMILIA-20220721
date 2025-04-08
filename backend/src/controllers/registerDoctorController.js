import doctorModel from "../models/Doctores.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerDoctorController = {};

registerDoctorController.register = async (req, res) => {
    const { nombre, especialidad, correo, contraseña } = req.body;

    try {
        // Verificamos si el doctor ya existe
        const existDoctor = await doctorModel.findOne({ correo });
        if (existDoctor) {
            return res.json({ message: "Doctor ya existe" });
        }

        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contraseña, 10);

        // Guardar el doctor en la base de datos
        const newDoctor = new doctorModel({
            nombre,
            especialidad,
            correo,
            contraseña: passwordHash, // Usamos la contraseña encriptada
        });

        await newDoctor.save();

        // Generar token JWT
        jsonwebtoken.sign(
            { id: newDoctor._id }, // Datos a guardar
            config.JWT.secret, // Secreto para firmar el token
            { expiresIn: config.JWT.expireIn }, // Tiempo de expiración del token
            (error, token) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Error generando el token" });
                }
                // Se guarda el token en una cookie
                res.cookie("authToken", token);
                res.json({ message: "Doctor registrado exitosamente" });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al registrar el doctor" });
    }
};

export default registerDoctorController;
