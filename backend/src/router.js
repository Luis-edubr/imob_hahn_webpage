const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const houseController = require('./controller/controller')

router.get('/allHouses', houseController.getAllHouses);
router.get('/getHouseById/:id', houseController.getHouseById);
router.post('/getHouseByParameter', houseController.getHouseByParameter);

module.exports = router; 