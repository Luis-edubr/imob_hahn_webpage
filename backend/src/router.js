import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

import { getAllHouses, getHouseById, getHouseByParameter } from './controller/controller.js';
import { login, validateToken } from './controller/authController.js';

router.get('/allHouses', getAllHouses);
router.get('/getHouseById/:id', getHouseById);
router.get('/validateToken', validateToken)
router.post('/getHouseByParameter', getHouseByParameter);
router.post('/login', login);


export default router;