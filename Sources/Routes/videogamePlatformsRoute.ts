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
router.get('/byGame/:id', getAllPLatformForGame);
router.get('/byPlatform/:id', getGamesForPlatforms)
router.delete('/', removeGameFromPlatform);

export default router;
