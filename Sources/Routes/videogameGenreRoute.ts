import express from 'express';
import {
    addGenreToGame,
    getGenresforGame,
    removeGenreFromVideogame,
}
from '../Controllers/videogameGenreController';

const router = express.Router();

router.post('/', addGenreToGame);
router.get('/:videogameId', getGenresforGame);
router.delete('/', removeGenreFromVideogame);

export default router;

