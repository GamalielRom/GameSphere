import {Request, Response} from 'express';
import {createReview, 
        getAllReviews, 
        getReviewById, 
        updateReviewById, 
        deleteReviewById} 
        from '../../ts/CRUD';

export const createNewReview = async(req:Request, res:Response): Promise<void>  => {
    try{
        const {
            User_id,
            Videogame_id,
            Rating, 
            Comment
        } = req.body;
        if(isNaN(User_id) || isNaN(Videogame_id)){
            res.status(400).json({error: 'Failed creating the Review, videogame or user id missing or have a bad input '});
            return;
        }
        if(isNaN(Rating) || Rating < 1 || Rating > 5){
            res.status(400).json({error: 'Rating must be between 1 to 5'});
            return;
        }
        if(!Rating || !Comment){
            res.status(400).json({error: 'Failed creating the review, missing fields required'});
            return;
        }
        if (!Comment || typeof Comment !== 'string') {
            res.status(400).json({ error: 'Comment is required and must be a valid string.' });
            return;
        }
        const newReview = {
            User_id: Number(User_id),
            Videogame_id: Number(Videogame_id),
            Rating: Rating,
            Comment: String(Comment)
        }
        ;
        const Review = await createReview(newReview);
        res.status(201).json({message: 'Review created successfully', Review })
    }catch(error){
        console.error('Error creating review:', error);
        res.status(500).json({error: 'Impossible to create the review'});
    }
};

export const getAllExistingReviews = async(req: Request, res: Response): Promise<void>  => {
    try{
        const reviews = await getAllReviews();
        res.status(200).json(reviews);
    }catch(error){
        console.error('Error reading the reviews:', error);
        res.status(500).json({error: 'Error fetching the reviews'});
    }
};

export const getReviewByID = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({errror: 'Please enter a valid number for the ID'})
            return;
        }
        const review = await getReviewById(id);
        if(!review){
            res.status(404).json({error: `Error trying to find the user with id: ${id}`})
            return;
        }
        res.status(200).json(review);
    }catch(error){
        console.error('Error fetching the review:', error);
        res.status(500).json({error: `Error finding the review with this ID }`});
    }
};

export const updateReviewByID = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id =  parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Please enter a valid number for the id'});
            return;
        };
        const {
            Comment,
            Rating
        } = req.body;
        if(!Comment || !Rating){
            res.status(400).json({error: 'Cannot have fields in blank when is trying to update a review'});
            return;
        }
        if (isNaN(Rating) || Rating < 1 || Rating > 5) {
            res.status(400).json({ error: 'Rating must be a valid number between 1 and 5.' });
            return;
        }
        const updates = {
            Comment: String(Comment),
            Rating: Number(Rating)
        };
        const updateReview = await updateReviewById(id, updates);
        res.status(200).json({message: 'Review updated successfully', review: updateReview});
    }catch(error){
        console.error('Error updating review:', error);
        res.status(500).json({error: 'Impossible to update the review'});
    }
};
  
export const deleteReviewByID = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Please enter a valud Number in the id you want to delete'});
            return;
        };
        await deleteReviewById(id);
        res.status(200).json({message: `Successfully deleted review with ID ${id}`});
    }catch(error){
        console.error('Error deleting the review', error);
        res.status(500).json({error: 'Impossible to delete this review please try again'});
    }
};