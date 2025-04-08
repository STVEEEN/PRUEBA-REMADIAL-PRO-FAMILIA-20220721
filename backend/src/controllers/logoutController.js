const logoutController = {};

logoutController.logout = async (req, res) => {
    // Borra la cookie de authToken
    res.clearCookie("authToken");

    // Responde con un mensaje de éxito indicando que la sesión ha sido cerrada
    return res.json({ message: "Sesión cerrada con éxito" });
}

export default logoutController;
