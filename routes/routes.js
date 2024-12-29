import express from 'express'
import { saveDatetime } from '../controller/controller.js';

const router = express.Router()

router.get('/getdatetime', saveDatetime);


export default router