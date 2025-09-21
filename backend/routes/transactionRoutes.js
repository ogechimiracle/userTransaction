import {Router} from 'express'

import { getTransaction } from '../controllers/userTnx.js';

const router = Router()


router.get("/", getTransaction);


export default router