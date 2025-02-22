import {Request, Response} from 'express';
import {CreateVideogame, getAllVideogames, getVideogameByID, updateVideogameByID, deleteVideogameByID} from '../../ts/CRUD'
import { error } from 'console';


export const createGame = async(req: Request, res:Response): Promise<void>  => {
    try{
            const {
                gameName,
                Description,
                Image,
                PlayStation_Link,
                Steam_Link,
                Nintendo_Link,
                Xbox_Link,
                game_page_link,
                critic_rating,
                user_rating,
                trophies,
                Trailer,
                players,
                company_id
            } = req.body;
            if(!gameName || !Description || !Image || !company_id){
                res.status(400).json({error: 'Missing required fields'})
                return;
            };
            const values = [
                gameName,
                Description,
                Image,
                PlayStation_Link,
                Steam_Link,
                Nintendo_Link,
                Xbox_Link,
                game_page_link,
                critic_rating,
                user_rating,
                trophies,
                Trailer,
                players,
                company_id
            ];
            const createVideogame = await CreateVideogame(values);
            res.status(201).json({message: 'Videogame created successfully', game: createVideogame});
        }catch(error){
            console.error('Error creating videogame:', error);
            res.status(500).json({error: 'Impossible to create the videogame'});
        }
    };
    
    
export const getAllgames = async(req: Request, res: Response): Promise<void>  =>{
    try{
        const videogames = await getAllVideogames();
        res.status(200).json(videogames);
    }catch(error){
        res.status(500).json({error: 'Could not fetch the videogames'});
    }
};

export const getGameByID = async (req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(404).json({error: 'Please enter a valid ID'});
        }
        const game = await getVideogameByID(id);
        if(!game){
            res.status(404).json({error: 'Game Not Found'});
            return;
        }
        res.status(200).json(game);
    }catch(error){
        res.status(500).json({error: 'Could not fetch the videogame'});
    }
};

export const updateGameByID =  async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.body.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Missing the Videogame ID'});
            return;
        };
        const {
            gameName,
            Description,
            Image,
            PlayStation_Link,
            Steam_Link,
            Nintendo_Link,
            Xbox_Link,
            game_page_link,
            critic_rating,
            user_rating,
            trophies,
            Trailer,
            players,
            company_id
        } = req.body;
        if(!gameName || !Description || company_id == null){
            res.status(400).json({error: 'Missing required fields'});
            return;
        };
        const updates: Partial<{
            gameName: string;
            Description: string;
            Image: string;
            PlayStation_Link: string;
            Steam_Link: string;
            Nintendo_Link: string;
            Xbox_Link: string;
            game_page_link: string;
            critic_rating: number;
            user_rating: number;
            trophies: number;
            Trailer: string;
            players: number;
            company_id: number;
        }> = {
            gameName,
            Description,
            Image,
            PlayStation_Link,
            Steam_Link,
            Nintendo_Link,
            Xbox_Link,
            game_page_link,
            critic_rating,
            user_rating,
            trophies,
            Trailer,
            players,
            company_id,
        };

        const updateGame = await updateVideogameByID(Number(id), updates);
        res.status(201).json({message: 'Videogame updated successfully', game: updateGame});

    }catch(error){
        console.error('Error updating videogame:', error);
        res.status(500).json({error: 'Impossible to update the videogame'});
    }
};

export const deleteGameByID = async(req: Request, res: Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Missing the Videogame ID'});
            return;
        }
        await deleteVideogameByID(id);
        res.status(200).json({message: `Videogame with ID ${id} deleted sucessfully`});
    }catch(error: any){
        if(error.message.includes('Does not exist')){
            res.status(404).json({error: error.message});
            return;
        }
        res.status(500).json({error: 'Could not delete the videogame'});
    }
};