const router = require('express').router();
const userController = require('../controller/userController');

// Las rutas que preceden a otras rutas tienen prioridad.
// Las rutas con parámetros, seguidas por otra ruta, ocupan el segundo lugar.
// Las rutas con parámetros se ubican en tercer lugar.
// Las rutas sin parámetros se colocan en cuarto lugar.

router.post("/login", versionMiddleware("1.0.0"), userController.signInUser);
router.post("/logout", versionMiddleware("1.0.0"), userController.logOutUser);
router.post("/", versionMiddleware("1.0.0"), userController.addNewUser);

router.put("/:id", versionMiddleware("1.0.0"), userController.updateUserById);
router.delete("/:id", versionMiddleware("1.0.0"), userController.deleteUserById);

module.exports = router;