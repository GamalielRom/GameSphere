import {Request, Response} from 'express';
import {addVideogameToPlatform, getPlatformsForVideogames, getVideoGamesForPlatforms, RemoveVideogameFromPlatForm} from '../../ts/CRUD';

export const addGameToPlatform = async(req: Request, res: Response) => {
    try{
        const {videogameId, plataformId} = req.body
        if(!videogameId || isNaN(videogameId) || !plataformId || isNaN(plataformId)){
            return res.status(400).json({error: 'Both the videogameId and platformId are required and should be numbers'});
        }
        await addVideogameToPlatform(videogameId, plataformId);
        res.status(201).json({message:`Videogame ${videogameId} assigned to platform: ${plataformId}`});
    }catch(error){
        console.error('error assign videogame to platform', error);
        res.status(500).json({error: 'Could not assign this videogame to the platform please try agian'});
    }
};

export const getAllPLatformForGame = async(req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            return res.status(400).json({error:'Invalid videogameID'});
        }
        const platform = await getPlatformsForVideogames(id);
        res.status(200).json(platform);
    }catch(error: any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(400).json({error:'Are you sure that your using the correct id? please check and try again'});
        }
        console.error('Error fetching the platforms', error);
        res.status(500).json({error: 'Could not fetch platforms for videogame'});
    }
};

export const getGamesForPlatforms = async(req: Request, res: Response) => {
    try{
        const id =  parseInt(req.params.id, 10);
        if(isNaN(id)){
            return res.status(400).json({error:'Invalid PlatformID'})
        }
        const videogames = await getVideoGamesForPlatforms(id);
        res.status(200).json(videogames);
    }catch(error:any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(400).json({error:'Are you sure that your using the correct id? please check and try again'});
        }
        console.error('Error fetching the videogames', error);
        res.status(500).json({error: 'Could not fetch videogames for platform'});
    }
};

export const removeGameFromPlatform = async(req: Request, res: Response) => {
    try{
        const {videogameId, plataformsId} = req.body;
        if(!videogameId || isNaN(videogameId) || !plataformsId || isNaN(plataformsId)){
            return res.status(400).json({error:'Both the videogameID and platformID are required to remove a relationship'});  
        }
        await RemoveVideogameFromPlatForm(videogameId, plataformsId);
        res.status(200).json({message: `videogame with id: ${videogameId} sucessfully eliminated from platform: ${plataformsId}`});
    }catch(error:any){
        if(String(error).includes('CONSTRAINT FAILED')){
            res.status(500).json({error: 'Something went wrong with the ids, are you sure your removing the correct genres?'});
        }
        console.error('error removing game:', error);
        res.status(500).json({error: 'Could not remove game from the platform'});
    }
};