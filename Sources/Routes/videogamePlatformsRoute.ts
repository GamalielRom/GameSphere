import express from 'express';
import {
    addGameToPlatform,
    getAllPLatformForGame,
    getGamesForPlatforms,
    removeGameFromPlatform
}
from '../Controllers/videogamePlatformController';

const router = express.Router();

router.post('/', addGameToPlatform);
router.get('/:id', getAllPLatformForGame);
router.get('/:id', getGamesForPlatforms)
router.delete('/', removeGameFromPlatform);

export default router;
