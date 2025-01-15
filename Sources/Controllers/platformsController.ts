import {Request, Response} from 'express';
import { getAllPlatform, getPlatformById } from '../../ts/CRUD';

export const getAllPlatforms = async(req: Request, res: Response) =>{
    try{
        const platforms =  await getAllPlatform();
        res.status(200).json(platforms);
    }catch(error){
        console.error('Error fetching the platforms', error.message);
        res.status(500).json({error:'Could not fetch the platforms'});
    }
};

export const getPlatformByID = async(req: Request, res: Response) =>{
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            return res.status(400).json({error: 'Invalid or missing platform ID, Remember we only work with 4 platforms'});
        }
        const platform = await getPlatformById(id);
        if(!platform){
            return res.status(404).json({error: `PLatform with ID of ${id} could not be found`});
        }
        res.status(200).json(platform);
    }catch(error){
        console.error('Error fetching the platform', error.message);
        res.status(500).json({error:'could not fetch the platform'});
    }
};
