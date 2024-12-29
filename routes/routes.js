import express from 'express'
import { backendCheck, saveDatetime } from '../controller/controller.js';

const router = express.Router()

router.get('/',backendCheck)
router.get('/getdatetime', saveDatetime);


export default router