import {Request, Response} from 'express';
import {createUser, 
        getAllUsers, 
        getUserById, 
        updateUserById, 
        deleteUserById} 
        from '../../ts/CRUD';
    
export const createNewUser =  async(req: Request, res: Response): Promise<void>  => {
    try{
        const {userName, userEmail, userPassword, userPhone} = req.body;
        if(!userName || !userEmail || !userPassword || !userPhone){
            res.status(400).json({mesage: "All the fields are required to create a new user"});
            return;
        }
        if(isNaN(Number(userPhone)) || !Number.isInteger(Number(userPhone))){
            res.status(400).json({ message: "Invalid phone number format" });
            return;
        }
        const newUser = {
            userName: String(userName),
            userEmail: String(userEmail),
            userPassword: String(userPassword),
            userPhone: Number(userPhone)
        };
        const createNewUser = await createUser(newUser);
        res.status(201).json({message: 'User created successfully', user: createNewUser});
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Impossible to create the user'});
    }
};

export const getAllExistingUsers = async(req:Request, res: Response): Promise<void>  => {
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch(error){
        console.error('Error reading the users:', error);
        res.status(500).json({error: 'Error fetching the users'});
    }
};

export const getUserByID = async(req:Request, res:Response): Promise<void>  => {
    try{
        const id =  parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({errror: 'Please enter a valid number for the ID'})
            return;
        }
        const user = await getUserById(id);
        if(!user){
            res.status(404  ).json({error: `Error trying to find the user with id: ${id}`})
            return;
        }
        res.status(200).json(user);
    }catch(error){
        console.error('Error reading the user:', error);
        res.status(500).json({error: `Error finding the user with this ID }`});
    }
};

export const updateUserByID = async(req:Request, res:Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({errror: 'Please enter a valid number for the ID'});
            return;
        }
        const {
            userName,
            userEmail,
            userPassword,
            userPhone
        } = req.body;

        if(!userName || !userEmail || !userPassword || !userPhone){
            res.status(400).json({error: 'Cannot have fields in blank when is trying to update a user'});
            return
        }

        if(isNaN(userPhone) || !Number.isInteger(Number(userPhone))){
            res.status(400).json({error: 'Invalid phone format'});
            return;
        }

        const updates = {userName: String(userName),
                        userEmail: String(userEmail),
                        userPassword: String(userPassword),
                        userPhone: Number(userPhone) 
                    };

        const updateUser = await updateUserById(Number(id), updates);
        res.status(200).json({message: 'User updated successfully', user: updateUser});

        }catch(error){
            console.error('Error updating user:', error);
            res.status(500).json({error: 'Impossible to update the user'});
        }
    };
     
export const deleteUserByID = async(req:Request, res:Response): Promise<void>  => {
    try{
        const id = parseInt(req.params.id, 10);
        if(isNaN(id)){
            res.status(400).json({error: 'Please enter a valud Number in the id you want to delete'});
            return;
        }
        await deleteUserById(id);
        res.status(200).json({message: `Successfully deleted user with ID ${id}`});
    }catch(error){
        console.error('Error deleting the user', error);
        res.status(500).json({error: 'Impossible to delete this user please try again'});
    }
};

