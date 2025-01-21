import express from 'express';
import {createCompanies,
    getAllExistingCompanies, 
    getCompanyById, 
    updateCompanyById, 
    deleteCompanyById} 
    from '../Controllers/companyController';

const router = express.Router();

router.get('/', getAllExistingCompanies);
router.get('/:id', getCompanyById);
router.post('/', createCompanies);
router.put('/:id', updateCompanyById);
router.delete('/:id', deleteCompanyById);

export default router;