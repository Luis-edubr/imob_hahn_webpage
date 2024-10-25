const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const houseController = require('./controller/controller')

router.get('/allHouses', houseController.getAllHouses);

module.exports = router;