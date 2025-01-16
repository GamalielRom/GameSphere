import {Request, Response} from 'express';
import {AddGenreToVideogame, removeVideogameGenre, getGenresForVideogame} from '../../ts/CRUD';

export const addGenreToGame = async(req: Request, res: Response) =>{
    try{
        const {videogameId, genresId} = req.body;
        if(!videogameId || isNaN(videogameId) || !genresId || isNaN(genresId)){
            return res.status(400).json({error: 'Both the videogameId and GenreId are required and should be numbers'});
        }
        await AddGenreToVideogame(videogameId, genresId);
        res.status(201).json({message:`Genre ${genresId} assigned to videogame: ${videogameId}`});
    }catch(error){
        console.error('error assign genre', error);
        res.status(500).json({error: 'Could not assign this genre to the videogame please try agian'});
    }
};

export const getGenresforGame = async(req:Request, res: Response) =>{
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            return res.status(400).json({error:'Invalid videogameId'});
        }
        const genres = getGenresForVideogame(id);
        res.status(200).json(genres);
    }catch(error:any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(400).json({error:'Are you sure that your using the correct id? please check and try again'});
        }
        console.error('Error fetching the genres', error);
        res.status(500).json({error: 'Could not fetch genres for videogame'});
    }
};

export const removeGenreFromVideogame = async(req: Request, res: Response) => {
    try{
        const {videogameId, gernesId} = req.body;
        if(!videogameId || isNaN(videogameId) || !gernesId || isNaN(gernesId)){
            return res.status(400).json({error:'Both the videogameId and GenreId are required to remove a relationship'});  
        };
        await removeVideogameGenre(videogameId, gernesId);
        res.status(200).json({message: `Genre with id: ${gernesId} sucessfully eliminated from videogame: ${videogameId}`});
    }catch(error:any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(500).json({error: 'Something went wrong with the ids, are you sure your removing the correct genres?'});
        }
        console.error('error removing genre:', error);
        res.status(500).json({error: 'Could not remove genre from the videogame'});
    }
};
