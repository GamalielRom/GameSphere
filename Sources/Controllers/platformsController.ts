import {Request, Response} from 'express';
import { getAllPlatform, getPlatformById } from '../../ts/CRUD';

export const getAllPlatforms = async(req: Request, res: Response): Promise<void>  =>{
    try{
        const platforms =  await getAllPlatform();
        res.status(200).json(platforms);
    }catch(error){
        console.error('Error fetching the platforms', (error as Error).message);
        res.status(500).json({error:'Could not fetch the platforms'});
    }
};

export const getPlatformByID = async(req: Request, res: Response): Promise<void>  =>{
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Invalid or missing platform ID, Remember we only work with 4 platforms'});
            return;
        }
        const platform = await getPlatformById(id);
        if(!platform){
            res.status(404).json({error: `PLatform with ID of ${id} could not be found`});
            return;
        }
        res.status(200).json(platform);
    }catch(error){
        console.error('Error fetching the platform', (error as Error).message);
        res.status(500).json({error:'could not fetch the platform'});
    }
};
