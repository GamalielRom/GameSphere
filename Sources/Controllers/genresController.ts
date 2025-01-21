import {Request, Response} from 'express';
import {createGenre, 
        getAllGenres, 
        getGenreByID, 
        updateGenreByID, 
        deleteGenreByID} 
        from '../../ts/CRUD';


export const createGenres= async(req: Request, res:Response): Promise<void>  => {
    try{
        const {game_genre} = req.body;
        if(!game_genre){
            res.status(400).json({error: 'The only field required'});
            return;
        }
        const newGenre = await createGenre(game_genre);
        res.status(201).json({message: 'Genre created successfully', game: newGenre});
    }catch(error){
        console.error('Error creating genre:', error);
        res.status(500).json({error: 'Impossible to create the genre'});
    }
};

export const getAllExistingGenres = async(req: Request, res: Response): Promise<void>  => {
    try{
        const genres = await getAllGenres();
        res.status(200).json(genres);
    }catch(error){
        res.status(500).json({error: 'Could not fetch the genres'});
    }
};

export const getGenreById = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(404).json({error:'Make sure that the id is a number'});
            return;
        };  
        const genre = await getGenreByID(id);
        if(!genre){
            res.status(404).json({error: 'genre Not Found'});
            return;
        }; 
        res.status(200).json(genre);
    }catch(error){
        res.status(500).json({error: 'Could not fetch the genre'});
    }
};

export const updateGenreById = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Missing the Genre ID'});
            return;
        };
        const {game_genre} = req.body;
        if(!game_genre || typeof game_genre !== 'string'){
            res.status(400).json({error: 'Missing the only field'});
            return;
        };
        const updates = {
            game_genre: game_genre, // Asegurarnos de que es un string limpio
        };
        const updateGenre = await updateGenreByID(id, updates);
        if (!updateGenre) {
            res.status(404).json({ error: `Genre with ID ${id} not found` });
            return;
        }
        res.status(201).json({message: 'Videogame updated successfully', genre: updateGenre});
    }catch(error:any){
        console.error('Error updating genre:', error);
        res.status(500).json({error: 'Impossible to update the genre'});
    }
};

export const deleteGenreById = async(req: Request, res: Response): Promise<void> => {
    try{
        const id = parseInt(req.params.id, 10);
            if(isNaN(id)){
                res.status(400).json({error: 'Missing the Genre ID'});
                return;
            }
            await deleteGenreByID(id);
            res.status(200).json({message: `Genre with ID ${id} deleted sucessfully`});
        }catch(error: any){
            if(error.message.includes('Does not exist')){
                res.status(404).json({error: error.message});
                return;
            }
            console.error('Error deleting genre:', error);
            res.status(500).json({error: 'Could not delete the Genre'});
        }
};