import express from 'express';
import {
    getAllExistingReviews,
    getReviewByID,
    createNewReview,
    updateReviewByID,
    deleteReviewByID
} from '../Controllers/reviewController'

const router = express.Router();

router.get('/', getAllExistingReviews);
router.get('/:id', getReviewByID);
router.post('/', createNewReview);
router.put('/:id', updateReviewByID);
router.delete('/:id', deleteReviewByID);

export default router;
