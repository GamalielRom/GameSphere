import express from 'express';
import {
    addFavoritesToUser,
    getAllFavoriteGames,
    removeFavoriteFromUser,
}
from '../Controllers/userFavoriteController';

const router = express.Router();
/**
 * @route POST /favorites
 * @desc Add a videogame to the user's favorites list
 * @access Public
 */
router.post('/', addFavoritesToUser);
/**
 * @route GET /favorites/:id
 * @desc Get all favorite games for a specific user
 * @access Public
 */
router.get('/:id', getAllFavoriteGames);
/**
 * @route DELETE /favorites
 * @desc Remove a videogame from the user's favorites list
 * @access Public
 */
router.delete('/', removeFavoriteFromUser);

export default router;
