import {Request, Response} from 'express';
import {createCompany, 
        getAllCompanies, 
        getCompanyByID, 
        updateCompanyByID, 
        deleteCompanyByID} 
        from '../../ts/CRUD';

export const createCompanies =  async(req: Request, res:Response) => {
    try{
        const {company_name} = req.body;
        if(!company_name){
            return res.status(400).json({error: 'The only field required'});
        }
        const newCompany = await createCompany(company_name);
        res.status(201).json({message: 'company created successfully', company: newCompany});
    }catch(error){
        console.error('Error creating company:', error);
        res.status(500).json({error: 'Impossible to create the company'});
    }
};

export const getAllExistingCompanies = async(req: Request, res: Response) =>{
    try{
         const companies = await getAllCompanies();
        res.status(200).json(companies);
    }catch(error){
        res.status(500).json({error: 'Could not fetch the companies'});
    }
};

export const getCompanyById = async(req: Request, res: Response) => {
     try{
            const id = parseInt(req.params.id, 10);
            if(isNaN(id)){
                return res.status(400).json({ error: 'Invalid Company ID' });
            }
            const company = await getCompanyByID(id);
            if(!company){
                return res.status(404).json({error: 'company Not Found'});
            } 
            res.status(200).json(company);
        }catch(error){
            res.status(500).json({error: 'Could not fetch the company'});
        }
};

export const updateCompanyById = async(req: Request, res: Response) => {
     try{
            const id = parseInt(req.params.id, 10);
            if(isNaN(id)){
                return res.status(400).json({error: 'Missing the Genre ID'});
            };
            const {company_name} = req.body;
            if(!company_name || typeof company_name !== 'string'){
                return res.status(400).json({error: 'Missing the only field, or invalid type of input'});
            };
            const updates = { company_name };
            const updateCompany = await updateCompanyByID(id, updates);
            if (!updateCompany) {
                return res.status(404).json({ error: `Company with ID ${id} not found` });
            }
            res.status(201).json({message: 'Company updated successfully', company: updateCompany});
        }catch(error){
            console.error('Error updating genre:', error);
            res.status(500).json({error: 'Impossible to update the company'});
        }
};

export const deleteCompanyById = async(req: Request, res: Response)=> {
    try{
        const id = parseInt(req.params.id, 10);
            if(isNaN(id)){
                return res.status(400).json({error: 'Missing the Company ID'});
            }
            const deleted = await deleteCompanyByID(id);
            if(!deleted){
                return res.status(404).json({error: `Company with the id ${id} does not exist`});
            }
            res.status(200).json({message: `Company with ID ${id} deleted sucessfully`});
        }catch(error){
            console.error('Error deleting company:', error);
            res.status(500).json({error: 'Could not delete the company'});
        }
};