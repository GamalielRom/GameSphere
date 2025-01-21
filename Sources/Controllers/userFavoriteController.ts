import {Request, Response} from 'express';
import {addUserFavorites, 
        getAllFavoritesForUser, 
        removeUserFavorite,} 
        from '../../ts/CRUD';

export const addFavoritesToUser = async(req: Request, res: Response): Promise<void>  => {
    try{
        const {User_id, Videogame_id} = req.body;
        if(!User_id || isNaN(User_id) || !Videogame_id || isNaN(Videogame_id)){
            res.status(400).json({error: 'Both User ID and Videogame ID are required and must be valid numbers.'});
            return;
        }
        await addUserFavorites(Number(User_id), Number(Videogame_id));
        res.status(201).json({message:`User ${User_id} assigned to favorite list the Videogame: ${Videogame_id}`});
    }catch(error){
        console.error('error assign favorite', error);
        res.status(500).json({error: 'Could not assign this game to the user list please try agian'});
    }
};

export const getAllFavoriteGames = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error:'Invalid userID'});
            return;
        }
        const favorites = await getAllFavoritesForUser(id);
        if (favorites.length === 0) {
            res.status(404).json({ message: 'No favorite games found for this user' });
            return;
        }
        res.status(200).json(favorites);
    }catch(error: any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(400).json({error:'Are you sure that your using the correct id? please check and try again'});
        }
        console.error('Error fetching the favorite games', error);
        res.status(500).json({error: 'Could not fetch favorite games for user'});
    }
};

export const removeFavoriteFromUser = async(req: Request, res: Response): Promise<void>  => {
    try{
        const {User_id, Videogame_id} = req.body;
        if(!User_id || isNaN(User_id) || !Videogame_id || isNaN(Videogame_id)){
            res.status(400).json({error:'Both the UserID and VideogameID are required to the favorite game from the user list'});  
            return;
        }
        await removeUserFavorite(Number(User_id), Number(Videogame_id));
        res.status(200).json({message: `User with id: ${User_id} sucessfully eliminated game ${Videogame_id} from the list of favorites`})
    }catch(error: any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(500).json({error: 'Something went wrong with the ids, are you sure your removing the correct games?'});
        }
        console.error('error removing game:', error);
        res.status(500).json({error: 'Could not remove game from the user'});
    }
};