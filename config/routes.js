const router = require('express').Router();

//REQUERIR CONTROLADORES AQUI!
const miscController = require("../controllers/misc.controller");
const userController = require("../controllers/user.controller");

//rutas
router.get('/', miscController.index);

router.get("/register", userController.registerNewUser)
router.post("/register", userController.doRegisterNewUser)

router.get('/login', userController.login);
router.post('/login', userController.doLogin);

module.exports = router;