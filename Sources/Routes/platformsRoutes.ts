import express from 'express';
import {getAllPlatforms, getPlatformByID} from '../Controllers/platformsController';

const router = express.Router();

router.get('/platforms', getAllPlatforms);
router.get('/platforms/id', getPlatformByID);

export default router;