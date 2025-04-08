import doctorModel from "../models/Doctores.js";
import PacientesModel from "../models/Pacientes.js";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        let userFound; // Para guardar el usuario encontrado
        let userType; // Para guardar el tipo de usuario (doctor, Pacientes, admin)

        // 1. ADMIN: Si el correo y contraseña coinciden con los de admin
        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = "admin";
            userFound = { _id: "admin" }; // Representación de admin
        } else {
            // 2. DOCTOR: Si no es admin, buscamos en los doctores
            userFound = await doctorModel.findOne({ correo: email }); // Buscamos si es doctor
            userType = "doctor"; // Si lo encontramos, es un doctor

            // 3. PACIENTE: Si no es doctor, buscamos en los pacientes
            if (!userFound) {
                userFound = await PacientesModel.findOne({ correo: email }); // Si no es doctor, puede ser paciente
                userType = "Pacientes"; // Si lo encontramos, es un paciente
            }
        }

        // Si el usuario no se encuentra ni como doctor ni como paciente
        if (!userFound) {
            console.log("A pesar de buscar en todos lados, el usuario no existe");
            return res.json({ message: "Usuario no encontrado" });
        }

        // Validar la contraseña (solo si no es admin)
        if (userType !== "admin") {
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                return res.json({ message: "La contraseña es incorrecta, por favor inténtelo de nuevo." });
            }
        }

        // Crear un token JWT
        JsonWebToken.sign(
            // 1. Qué vamos a guardar en el token
            { id: userFound._id, userType },
            // 2. Secreto
            config.JWT.secret,
            // 3. Cuando expira el token
            { expiresIn: config.JWT.expireIn },
            // 4. Función de callback
            (error, token) => {
                if (error) console.log(error);

                // Guardamos el token en las cookies
                res.cookie("authToken", token);

                // Respondemos con un mensaje de éxito
                res.json({ message: "Inicio de sesión exitoso" });
            }
        );

    } catch (error) {
        console.log(error);
        res.json({ message: "Hubo un error en el inicio de sesión" });
    }
};

export default loginController;
