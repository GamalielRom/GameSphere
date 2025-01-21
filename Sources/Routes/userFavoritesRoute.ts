import express from 'express';
import {
    addFavoritesToUser,
    getAllFavoriteGames,
    removeFavoriteFromUser,
}
from '../Controllers/userFavoriteController';

const router = express.Router();
router.post('/', addFavoritesToUser);
router.get('/:id', getAllFavoriteGames);
router.delete('/:userId', removeFavoriteFromUser);

export default router;
