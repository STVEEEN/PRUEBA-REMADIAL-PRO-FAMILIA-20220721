// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser  from "cookie-parser";
import citasRoutes from "./src/routes/citasRoutes.js";
import doctorRoutes  from "./src/routes/doctorRoutes.js";
import pacienteRoutes from "./src/routes/pacientesRoutes.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerDoctorRoutes from "./src/routes/registerDoctor.js";
import registerPacientRoutes from "./src/routes/registerPacient.js";


// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que acepten cookies en postman
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/citas", citasRoutes);
app.use("./api/doctores", doctorRoutes);
app.use("./api/pacientes", pacienteRoutes);
app.use("./api/login", loginRoutes);
app.use("./api/logout", logoutRoutes);
app.use("./api/registerDoctor", registerDoctorRoutes);
app.use("./api/registerPacient", registerPacientRoutes)


// Exporto la constante para poder usar express en otros archivos
export default app;