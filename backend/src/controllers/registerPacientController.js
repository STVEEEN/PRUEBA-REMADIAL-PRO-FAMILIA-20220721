import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

import pacienteModel from "../models/Pacientes.js";
import { config } from "../config.js";

const registerPacienteController = {};

registerPacienteController.register = async (req, res) => {
    const { nombre, edad, correo, contraseña, telefono, isVerified } = req.body;

    try {
        // Verificar si el paciente ya existe
        const existingPaciente = await pacienteModel.findOne({ correo });
        if (existingPaciente) {
            return res.json({ message: "El paciente ya existe" });
        }

        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(contraseña, 11);

        // Crear el nuevo paciente
        const newPaciente = new pacienteModel({
            nombre,
            edad,
            correo,
            contraseña: passwordHash,
            telefono,
            isVerified: isVerified || false,
        });

        // Guardar el paciente en la base de datos
        await newPaciente.save();

        // Generar un código de verificación aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex");

        // Crear un token con el código de verificación
        const tokenCode = jsonwebtoken.sign(
            { correo, verificationCode },
            config.JWT.secret,
            { expiresIn: "2h" }
        );

        // Guardar el token en una cookie
        res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

        // Enviar un correo con el código de verificación
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.nodemailer.user,
                pass: config.nodemailer.pass,
            },
        });

        const mailOptions = {
            from: config.nodemailer.user,
            to: correo,
            subject: "Verificación de cuenta",
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
                            <h2 style="color: #007BFF;">¡Verifica tu cuenta!</h2>
                            <p style="font-size: 16px; color: #333333;">Hola ${nombre},</p>
                            <p style="font-size: 16px; color: #333333;">Gracias por registrarte como paciente. Tu código de verificación es:</p>
                            <h3 style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${verificationCode}</h3>
                            <p style="font-size: 16px; color: #333333;">Por favor, usa este código para verificar tu cuenta.</p>
                            <div style="margin-top: 30px; font-size: 14px; color: #aaaaaa;">
                                <p>Equipo de Soporte</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({ message: "Error al enviar el correo: " + error });
            }
            console.log("Correo enviado: " + info.response);
        });

        res.json({ message: "Paciente registrado, por favor verifica tu cuenta con el código enviado a tu correo." });

    } catch (error) {
        console.log(error);
        res.json({ message: "Hubo un error en el registro del paciente" });
    }
};

registerPacienteController.verifyCodeEmail = async (req, res) => {
    const { requireCode } = req.body;
    const token = req.cookies.verificationToken; // Acceder al token de verificación de la cookie

    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { correo, verificationCode: storedCode } = decoded;

        if (requireCode !== storedCode) {
            return res.json({ message: "Código incorrecto" });
        }

        const paciente = await pacienteModel.findOne({ correo });
        paciente.isVerified = true;
        await paciente.save();

        res.clearCookie("verificationToken");
        res.json({ message: "Cuenta verificada exitosamente" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Error al verificar el código" });
    }
};

export default registerPacienteController;
