import express from 'express';
import {createGenres,
    getAllExistingGenres, 
    getGenreById, 
    updateGenreById, 
    deleteGenreById} 
    from '../Controllers/genresController';

const router = express.Router();

router.get('/', getAllExistingGenres);
router.get('/:id', getGenreById);
router.post('/', createGenres);
router.put('/:id', updateGenreById);
router.delete('/:id', deleteGenreById);

export default router;