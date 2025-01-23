import express from 'express';
import {getAllPlatforms, getPlatformByID} from '../Controllers/platformsController';

const router = express.Router();

router.get('/', getAllPlatforms);
router.get('/:id', getPlatformByID);
export default router;