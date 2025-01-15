import express from 'express';
import {
    getAllgames,
    getGameByID,
    createGame,
    updateGameByID,
    deleteGameByID
} from '../Controllers/videogameController'

const router = express.Router();

router.get('/', getAllgames);
router.get('/:id', getGameByID);
router.post('/', createGame);
router.put('/:id', updateGameByID);
router.delete('/:id', deleteGameByID);

export default router;
