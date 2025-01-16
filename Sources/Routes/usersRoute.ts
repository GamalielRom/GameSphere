import express from 'express';
import {createNewUser,
        getAllExistingUsers, 
        getUserByID, 
        updateUserByID, 
        deleteUserByID} 
    from '../Controllers/userController';

const router = express.Router();

router.get('/', getAllExistingUsers);
router.get('/:id', getUserByID);
router.post('/', createNewUser);
router.put('/:id', updateUserByID);
router.delete('/:id', deleteUserByID);

export default router;