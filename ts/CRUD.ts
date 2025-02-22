import dbPromise from "./db";
//All of this are being used by the controllers on Sources/Controllers and then used by the routes
//Videogame Table
//Create a Videogame
export async function CreateVideogame(Videogame: 
   any) 
        {
            try{
                const db = await dbPromise;
                const query = `
                    INSERT INTO Videogames
                    (gameName, Description, Image, PlayStation_Link,Steam_Link,Nintendo_Link,Xbox_Link, game_page_link, critic_rating, user_rating, trophies, Trailer, players, company_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                const values = Object.values(Videogame)
                await db.run(query, values);
                console.log('Videogame added successfully');
            }catch(error){
                console.error('Cant add this videogame please try again', (error as Error).message);
            }
        };
        //Read all videogames
export async function getAllVideogames() {
    try{
        const db = await dbPromise;
        const query = ` SELECT 
                            v.*, 
                                GROUP_CONCAT(DISTINCT g.game_genre) AS genres,
                                GROUP_CONCAT(DISTINCT p.plataform_name) AS platforms,
                                c.company_name
                                FROM Videogames v
                                LEFT JOIN VideogamesGenre gg ON v.id = gg.videogameId
                                LEFT JOIN Genres g ON gg.genresId = g.id
                                LEFT JOIN VideogamesPlataforms vp ON v.id = vp.videogameId
                                LEFT JOIN Plataforms p ON vp.plataformsId = p.id
                                LEFT JOIN Companies c ON v.company_id = c.id
                                GROUP BY v.id;`;
        const videogames = await db.all(query);
        return videogames;
    }catch(error){
        console.error('Impossible to read all the videogames', (error as Error).message);
        return [];
    }
};

//Read one videogame
export async function getVideogameByID(id:number) {
    try{
        const db = await dbPromise;
        const query = `SELECT v.*, 
                        GROUP_CONCAT(g.game_genre, ', ') AS genres,
                        c.company_name
                        FROM Videogames v
                        LEFT JOIN VideogamesGenre gg ON v.id = gg.videogameId
                        LEFT JOIN Genres g ON gg.genresId = g.id
                        LEFT JOIN Companies c ON v.company_id = c.id
                        WHERE v.id = ?`
        const videogame = await db.get(query, id);
        return videogame;
    }catch(error){
        console.error('Impossible to select the videogame', (error as Error).message);
        return [];
    }
}
//Update Videogame byID
export async function updateVideogameByID(
    id:number,
    updates: Partial< {
        gameName: string,
      Description: string,
      Image: string,
      PlayStation_Link:string,
      Steam_Link:string,
      Nintendo_Link:string,
      Xbox_Link:string,
      game_page_link: string,
      critic_rating: number,
      user_rating: number,
      trophies: number,
      Trailer: string,
      players: number,
      company_id: number
    }>
    ) {
        try{
            const db = await dbPromise;
            const videogameExist = await db.get(`SELECT 1 FROM Videogames WHERE id = ?;`, id);
            if(!videogameExist){
                throw new Error(`Videogame with ID ${id} does not exist`);
            }

            if(Object.keys(updates).length === 0){
                throw new Error('Any fields to update');
            }
            const fields = Object.keys(updates)
                .map((key) => `${key} = ?`) 
                .join(", ");

            const values = Object.values(updates);
            values.push(id);

            const query = `UPDATE Videogames SET ${fields} WHERE id = ?;`;

            await db.run(query, values);
            console.log(`Videogame with the id of ${id} Updated`);
        } catch(error){
            console.error(`Impossible to find this videogame ${id}`, (error as Error).message);
        }

      };
//Delete videogameByID

export async function deleteVideogameByID(id:number): Promise<void> {
    try{
        const db = await dbPromise;
        const videogameExist = await db.get(`SELECT 1 FROM Videogames WHERE id = ?;`,id);
        if(!videogameExist){
            throw new Error(`Videogame with ID ${id} does not exist`);
        }
        const query = `DELETE FROM Videogames Where id = ?;`;
        const result = await db.run(query, id);
        if(result.changes === 0){
            throw new Error(`Failed to delete the videogame with the id of ${id}`);
        }
        console.log('Videogame Deleted Sucessfully')
        
    }
    catch(error){
        console.error('Error deleting the videogame:',(error as Error).message);
        throw Error;
    }
};

//GENRES TABLE 
// Add Genre 
export async function createGenre(
    game_genre: string) 
    {
            try{
            const db = await dbPromise;
            const existingGenre = await db.get(
                `SELECT 1 FROM Genres WHERE game_genre = ?`, [game_genre]
            );
            if(existingGenre){
                throw new Error(`Genre "${game_genre}" already exists`);
            }
            const query = 
            `
            INSERT INTO Genres
                (game_genre)
            VALUES (?);
            `;
            const result = await db.run(query, [game_genre]);
            console.log('Genre added successfully');
            return {id: result.lastID, game_genre};
        }catch(error : any){
            if(error.message.includes('already existis')){
                console.error('Genre already exists');
            }
            else{
                console.log('Error trying to add a genre', (error as Error).message);
                throw new Error('Failed to create genre');
            }
        }
    };

//Read all genres
export async function getAllGenres() {
    try{
        const db = await dbPromise;
        const query = `SELECT * FROM Genres`;
        const result = await db.all(query);
        console.log('Genres fetched from database:', result);
        return result;
    }
    catch(error){
        console.error('Something went wrong trying to read the genres',(error as Error).message);
        return [];
    }
};

//Read one genre
export async function getGenreByID(id:number) {
    try{
    const db = await dbPromise;
    const query = `Select * FROM Genres WHERE id = ?;`;
    const Genre = await db.get(query, id);
    if(!Genre){
        console.warn(`Genre with ID ${id} not found`);
        return null;
    }
    return Genre;
    }
    catch(error){
        console.error('Something went wrong reading that genre please try again or check if the genre exists',(error as Error).message);
        return [];
    }
};
    //Update Genre By ID

export async function updateGenreByID( 
    id:number,
    updates: Partial < {
        game_genre: string
    }>)
        {
        try{
        const db = await dbPromise;

        if(Object.keys(updates).length === 0){
            throw new Error('Any fields to update');
        }
        const genreExist =  await db.get(`SELECT 1 FROM Genres WHERE id  = ?`, id);
        if(!genreExist){
            throw new Error(`Genre with ${id} does not exist`);
        }
        const fields = Object.keys(updates)
            .map((key) => `${key} = ?`)
            .join(', ');
        const values = [...Object.values(updates), id];
        const query = `UPDATE Genres SET game_genre =? WHERE id = ?;`;
        const result = await db.run(query, values);
        if(result.changes === 0){
            return null;
        }
        console.log(`Genre with the id of ${id} Updated`);
        return result;
    } catch(error: any){
        console.error('Error updating the genre:', error.message);
        throw error;
    }
};

//DELETE GENRE ByID

export async function deleteGenreByID(id:number) {
    try{
        const db = await dbPromise;
        const genreExist = await db.get(`SELECT 1 FROM Genres WHERE id = ?;`,id);
        if(!genreExist){
            throw new Error(`Genre with ID ${id} does not exist`);
        }
        const query = `DELETE FROM Genres Where id = ?;`;
        await db.run(query, id);
        console.log('Genres Deleted Sucessfully')
    }
    catch(error){
        console.error('Error deleting the genre:',(error as Error).message);
    }
}
//Platform Table 
export async function getAllPlatform() 
    {
        try{
            const db = await dbPromise;
            const query = `Select * FROM Plataforms`;
            const result = await db.all(query);
            return result
        }catch(error){
            console.error('Error reading the table', (error as Error).message);
        }
    };

export async function getPlatformById(id:number) {
    try{
        const db = await dbPromise;
        const query = `SELECT * FROM Plataforms WHERE id = ?;`;
        const result = await db.all(query, id);
        return result;        
    }catch(error){
        console.error(`The id: ${id} does not exist`);
    }
};

//USERS Table
//Create a user
export async function createUser(User: 
    { userName: string,
      userEmail: string,
      userPassword: string,
      userPhone:number,
    }) 
        {
            try{
                const db = await dbPromise;
                const query = `
                    INSERT INTO Users
                    (userName, userEmail, userPassword, userPhone)
                    VALUES (?,?,?,?);
                `;
                const values = [
                    User.userName,
                    User.userEmail,
                    User.userPassword,
                    User.userPhone
                ];

                await db.run(query, values);
                console.log('User added successfully');
            }catch(error){
                console.error('Cant add the user please try again',(error as Error).message);
            }
        };
      //Read all Users
      export async function getAllUsers() {
        try{
            const db = await dbPromise;
            const query = `SELECT * FROM Users`;
            const users = await db.all(query);
            return users;
        }catch(error){
         console.error('Impossible to find all the users', (error as Error).message);
         return [];   
        }
    };
    
    //Read one User by ID
    export async function getUserById(id:number) {
        try{
            const db = await dbPromise;
            const query = `Select * FROM Users WHERE id = ?;`;
            const user = await db.get(query, id);
            return user;
        }catch(error)
        { 
            console.error('Impossible to find this user',(error as Error).message);
            return [];
        }
    };
    //Update Userby id
export async function updateUserById(
    id:number,
    updates: Partial< {
      userName: string,
      userEmail: string,
      userPassword: string,
      userPhone:number
    }>
    ) {
        try{
            const db = await dbPromise;
    
            if(Object.keys(updates).length === 0){
                throw new Error('Any fields to update');
            }
            const userExist =  await db.get(`SELECT 1 FROM Users WHERE id  = ?`, id);
            if(!userExist){
                throw new Error(`User with ${id} does not exist`);
            }
    
            const fields = Object.keys(updates)
                .map((key) => `${key} = ?`) 
                .join(", ");
    
            const values =[...Object.values(updates), id];
            const query = `UPDATE Users SET ${fields} WHERE id = ?;`;
            await db.run(query, values);
            console.log(`User with the id of ${id} Updated`);
        } catch(error){
            console.error('Error updating the user:', (error as Error).message);
        }
      };

      export async function deleteUserById(id:number) {
        try{
            const db = await dbPromise;
            const userExist = await db.get(`SELECT 1 FROM Users WHERE id = ?;`,id);
            if(!userExist){
                throw new Error(`User with ID ${id} does not exist`);
            }
            const query = `DELETE FROM Users Where id = ?;`;
            await db.run(query, id);
            console.log('User Deleted Sucessfully')
        }
        catch(error){
            console.error('Error deleting the User:', (error as Error).message);
        }
    };
//Review Table
//Create Review
export async function createReview(review:{
    User_id: number,
    Videogame_id: number,
    Rating: number,
    Comment: string,
}) {
    try{
        const db = await dbPromise;
        const query = 
        `
        INSERT INTO Reviews (User_id, Videogame_id, Rating, Comment)
        VALUES (?,?,?,?)
        `
        const values = [
            review.User_id,
            review.Videogame_id,
            review.Rating,
            review.Comment
        ];
        await db.run(query,values);
        console.log('Review added successfully');
    }catch(error){
        console.error('Impossible to add this review', (error as Error).message);
    }
};

//Read all reviews

export async function getAllReviews() {
    try{
        const db = await dbPromise;
        const query = 
        `
        SELECT Reviews. *, Users.userName, Videogames.gameName
        FROM Reviews
        JOIN Users ON Reviews.User_id = Users.id
        JOIN Videogames ON Reviews.Videogame_id = Videogames.id;
        `
        const reviews = await db.all(query);
        return reviews
    }catch(error){
        console.error('Impossible to read all reviews', (error as Error).message);
        return [];
    }
}
    
//Read review By ID
export async function getReviewById(id:number) {
    try{
        const db = await dbPromise;
        const query = 
        `Select r.*, u.userName, v.gameName
        FROM Reviews r
        JOIN Users u ON r.User_id = u.id
        JOIN Videogames v ON r.Videogame_id = v.id
        WHERE r.id = ?;
        `;
        const review = await db.get(query, id);
        return review;
    }catch(error)
    { 
        console.error('Impossible to find this review', (error as Error).message);
        return [];
    }
};
//Update a review by ID

export async function updateReviewById(
    id:number,
    updates: Partial <{
        Comment: string,
        Rating: number
    }>
) {
    try{
        const db = await dbPromise;
        if(Object.keys(updates).length === 0){
            throw new Error('No fields to update');
        }

        const fields = Object.keys(updates)
            .map((key) => `${key} = ?`)
            .join(', ');

        const values = [...Object.values(updates), id];
        const query = `UPDATE Reviews SET ${fields} WHERE id = ?;`;

        await db.run(query, values);
        console.log(`Review with ID ${id} Updated successfully`);
    }catch(error){
        console.error('Error updating the Review', (error as Error).message);
    }
};
//Remove review
export async function deleteReviewById(id:number) {
    try{
        const db = await dbPromise;
        const query = `DELETE FROM Reviews WHERE id = ?`;
        await db.run(query, id);
        console.log(`Record with id of ${id} removed successfully`);
    }catch(error){
        console.error('Impossible to remove this record', (error as Error).message);
    }
};

//Companies TABLE
//Create Company 

export async function createCompany(
    company_name: string) {
    try{
        const db = await dbPromise;
        const query = 
        `
        INSERT INTO Companies (company_name)
        VALUES (?)
        `
        const  result = await db.run(query,[company_name]);
        console.log('Company added successfully');
        return {id: result.lastID,company_name: company_name };
    }catch(error){
      if(error instanceof Error){
        if (error.message.includes('UNIQUE constraint failed')) {
            console.error('The company name already exists');
        } else {
            console.error('Impossible to add this company', error.message);
        };
      }else {
        console.error('An unknown error occurred', error);
    };
    }
};

//Read all companies

export async function getAllCompanies() {
    try{
        const db = await dbPromise;
        const query = 
        `
        SELECT * FROM Companies ORDER BY company_name ASC;
        `
        const companies = await db.all(query);
        return companies
    }catch(error){
        console.error('Impossible to read all companies', (error as Error).message);
        return [];
    }
}

//Read company By ID

export async function getCompanyByID(id:number) {
    try{
        const db = await dbPromise;
        const query = 
        `
        Select * FROM Companies WHERE Id = ?;
        `;
        const company = await db.get(query, id);
        if(!company){
            console.error(`Company with id: ${id} not found`);
            return null;
        }
        return company;
    }catch(error)
    { 
        console.error('Impossible to find this review', (error as Error).message)
        throw new Error('Could not fetch the company. Please try again later.');
    }
};

//Update CompanyByID

export async function updateCompanyByID(
    id:number,
    updates: Partial <{
        company_name: string
    }>
) {
    try{
        const db = await dbPromise;
        if(Object.keys(updates).length === 0){
            throw new Error('No fields to update');
        }
        const companyExist = await db.get(`SELECT 1 FROM Companies WHERE id = ?;`, id);
        if(!companyExist){
            throw new Error(`Company with ID ${id} does not exist`);
        }

        const fields = Object.keys(updates)
            .map((key) => `${key} = ?`)
            .join(', ');

        const values = [...Object.values(updates), id];
        const query = `UPDATE Companies SET ${fields} WHERE id = ?;`;

        const result = await db.run(query, values);
        if(result.changes === 0){
            throw new Error(`No changes maded to the company with ID ${id}`);
        }
        console.log(`Company with ID ${id} Updated successfully`);
        return result.changes;
    }catch(error){
        console.error('Error updating the Company', (error as Error).message);
        throw new Error('Failed to update the company. Please try again');
    }
};

//REMOVE COMPANY
export async function deleteCompanyByID(id:number) {
    try{
        const db = await dbPromise;
        const companyExist = await db.get(`SELECT 1 FROM Companies WHERE id = ?;`, id);

        if (!companyExist) {
        throw new Error(`Company with ID ${id} does not exist`);
        }

        const query = `DELETE FROM Companies WHERE id = ?`;
        const result = await db.run(query, id);

        if(result.changes === 0){
            throw new Error(`Failed to delete company with ID ${id}. No changes were made.`);   
        }
        console.log(`Record with id of ${id} removed successfully`);
        return result.changes;
    }catch(error){
        console.error('Impossible to remove this record', (error as Error).message);
        throw new Error('Impossible to remove this company. Please try again');
    }
};
/*********************************
    JOIN TABLES
********************************/
//VideogamesPlataforms Table
//Add a videogame to a platform
export async function addVideogameToPlatform(videogameId:number, plataformsId: number) {
    
    try{
        const db = await dbPromise;
        const query = 
            `INSERT INTO VideogamesPlataforms (videogameId, plataformsId) VALUES (?,?)`
        const result = db.all(query, videogameId, plataformsId);
        console.log(`Videogame ${videogameId} successfully linked to ${plataformsId}`);
        return result;
    }catch(error){
        console.error('Error linking videogame to the plataform', (error as Error).message);
    }
};

//Get All platforms associated with one game

export async function getPlatformsForVideogames(videogameId:number) {
    try{
        const db = await dbPromise;
        const query = 
            `SELECT Plataforms.plataform_name, Videogames.gameName 
			 FROM Plataforms
             INNER JOIN VideogamesPlataforms ON Plataforms.id = VideogamesPlataforms.plataformsId
			 INNER JOIN Videogames ON VideogamesPlataforms.videogameId = Videogames.id
             WHERE VideogamesPlataforms.videogameId = ?;
            `;
        const result = await db.all(query, [videogameId]);
        console.log('platforms from game fetched from database:', result); 
        return result;
    }catch(error){
        console.error('ERROR Fetching platforms for a videogame', (error as Error).message);
        return [];
    }
};
// Get All Videogames associated with one platform
export async function getVideoGamesForPlatforms(plataformId:number) {
    try{
        const db = await dbPromise;
        const query = 
            `SELECT gameName, Plataforms.plataform_name FROM Videogames
             INNER JOIN VideogamesPlataforms ON Videogames.id = VideogamesPlataforms.videogameId
			 INNER JOIN Plataforms ON VideogamesPlataforms.plataformsId = Plataforms.id
             WHERE VideogamesPlataforms.plataformsId = ?
            `;
        const result = await db.all(query, [plataformId]);
        console.log('games for platforms  fetched from database:', result); 
        return result;
    }catch(error){
        console.error('ERROR fetching Videogames for PLatforms',(error as Error).message);
        return [];
    }
};

//Delete relations from a videogame to a platform

export async function RemoveVideogameFromPlatForm(videogamesId:number, platformId: number) {
    const db = await dbPromise;

    try{
        await db.run(
            `DELETE FROM VideogamesPlataforms WHERE videogameId = ? AND plataformsId = ?`,
            [videogamesId, platformId]
        );
        console.log(`Videogame ${videogamesId} successfully unlinked to ${platformId}`)
    }
    catch(error){
        console.error('Error unlinking videogame from platform', (error as Error).message);
    }
}

//User_Favorites Table 

export async function addUserFavorites(userId:number, videogameId: number) {
    try{
        const db = await dbPromise;
        await db.run(
            `INSERT INTO User_Favorites (User_id, Videogame_id) VALUES (?, ?)`,
            [userId, videogameId]
        )
        console.log(`User ${userId} added this videogame ${videogameId} to favorites list`);
    }
    catch(error){
        console.error('Error adding this videogame to favorite list please try again later',(error as Error).message);
    }
}

//READ all favorites game for user
export async function getAllFavoritesForUser(userId:number) {
    try{
        const db = await dbPromise;
        const query = `SELECT Videogames.*, Users.userName AS username
                        FROM Videogames
                        INNER JOIN User_Favorites ON Videogames.id = User_Favorites.Videogame_id
                        INNER JOIN Users ON User_Favorites.User_id = Users.id
                        WHERE User_Favorites.User_id = ?`;
        const result = await db.all(query, [userId]);
        console.log('user Favorite fetched from database:', result);
        return result;
    }
    catch(error){
        console.error('Error reading the favorites for user', (error as Error).message);
        return [];
    }
}
//DELETE a game from favorites

export async function removeUserFavorite(userId:number, videogameId: number) {
    const db = await dbPromise;

    try{
        await db.run(
            `
            DELETE FROM User_Favorites WHERE User_id = ? AND Videogame_id = ?
            `,
            [userId, videogameId]
        )
        console.log(`Videogame ${videogameId} successfully removed from user ${userId}'s favorites`);
    }
    catch(error){
        console.error('Error removing videogame from user favorites list', (error as Error).message);
    }
}

//VIDEOGAMESGENRE TABLE
// Add genre to a videogame
export async function AddGenreToVideogame(videogameId:number, genreId: number) {
    const db = await dbPromise;

    try{
        const query = 'INSERT INTO VideogamesGenre (videogameId, genresId) VALUES (?, ?)';
        await db.run(query, [videogameId, genreId]);
        console.log(`Added genre ${genreId} to ${videogameId}`);
    }catch(error){
        console.error('Error adding the genre to this videogame', (error as Error).message);
    }
}

//Delete genre from vdeogame

export async function removeVideogameGenre(videogameId:number, genreId: number) {
    const db = await dbPromise;

    try{
        db.run(
            `
            DELETE FROM VideogamesGenre WHERE videogameId = ? AND genresId = ?
            `,
            [videogameId, genreId]
        );
        console.log(`Removed Genre ${genreId} from ${videogameId}`);
    }
    catch(error){
        console.error('Error removing genre from videogame', (error as Error).message);
    }
}

//Select Genres for videogame

export async function getGenresForVideogame(videogameId:number) {

    try{
        const db = await dbPromise;
        const query = `SELECT Videogames.gameName, Genres.game_genre FROM Videogames
			INNER JOIN VideogamesGenre ON Videogames.id = VideogamesGenre.videogameId
			INNER JOIN Genres ON VideogamesGenre.genresId = Genres.id
			WHERE Videogames.id = ?`;
        const result =  await db.all(query, [videogameId]);   
        console.log('genres from game fetched from database:', result); 
        return result;
    }catch(error){
        console.error('Error selecting genres for videogame', (error as Error).message);
        return [];
    }
};

