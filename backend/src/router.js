import express from "express";
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

import { getAllHouses, getHouseById, getHouseByParameter } from './controller/controller.js';
import { getAllRegisters, createNewRegister, getAllRegistersFromSpecificTable, getRegisterById, updateRegister, deleteRegister, searchRegisters } from './controller/adminController.js';
import { login, validateToken } from './controller/authController.js';
import {  validateDeleteRegister, validaeUpdateRegister, validateGetAllRegisters, validateGetRegisterById, validateNewRegister, validateKeyword } from './middlewares/adminMiddlewares.js';

router.get('/allHouses', getAllHouses);
router.get('/getHouseById/:id', getHouseById);
router.get('/validateToken', validateToken)
router.post('/getHouseByParameter', getHouseByParameter);
router.post('/login', login);

router.get('/admin/getAllRegisters', getAllRegisters);
router.get('/admin/getRegisterById/:id/:table', validateGetRegisterById, getRegisterById);
router.post('/admin/createNewRegister', validateNewRegister, createNewRegister);
router.put('/admin/updateRegister/:id/:table', validaeUpdateRegister, updateRegister);
router.get('/admin/getAllRegisters/:table', validateGetAllRegisters, getAllRegistersFromSpecificTable);
router.put('/admin/deleteRegister/:id/:table', validateDeleteRegister, deleteRegister);

router.post('/admin/searchRegisters', validateKeyword, searchRegisters);

export default router;