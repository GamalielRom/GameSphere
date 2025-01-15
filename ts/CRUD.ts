import dbPromise from "./db";
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
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);;
                `;
                const values = Object.values(Videogame)
                await db.run(query, values);
                console.log('Videogame added successfully');
            }catch(error){
                console.error('Cant add this videogame please try again', error.message);
            }
        };
        //Read all videogames
export async function getAllVideogames() {
    try{
        const db = await dbPromise;
        const query = ` SELECT v.*, GROUP_CONCAT(g.game_genre, ', ') AS genres
                        FROM Videogames v
                        LEFT JOIN VideogamesGenre gg ON v.id = gg.videogameId
                        LEFT JOIN Genres g ON gg.videogameId = g.id
                        GROUP BY v.id;`;
        const videogames = await db.all(query);
        return videogames;
    }catch(error){
        console.error('Impossible to read all the videogames', error.message);
        return [];
    }
};

//Read one videogame
export async function getVideogameByID(id:number) {
    try{
        const db = await dbPromise;
        const query = `SELECT v.*, GROUP_CONCAT(g.game_genre, ', ') AS genres
                        FROM Videogames v
                        LEFT JOIN VideogamesGenre gg ON v.id = gg.videogameId
                        LEFT JOIN Genres g ON gg.genresId = g.id
                        WHERE v.id = ?;`;
        const videogame = await db.get(query, id);
        return videogame;
    }catch(error){
        console.error('Impossible to select the videogame', console.error);
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
            console.error(`Impossible to find this videogame ${id}`, error.message);
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
        console.error('Error deleting the videogame:', error.message);
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
                console.log('Error trying to add a genre', error.message);
                throw new Error('Failed to create genre');
            }
        }
    };

//Read all genres
export async function getAllGenres() {
    try{
    const db = await dbPromise;
    const query = `SELECT * FROM Genres ORDER BY game_genre ASC`;
    const Genres = await db.all(query);
    return Genres;
    }
    catch(error){
        console.error('Something went wrong trying to read the genres', error.message);
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
        console.error('Something went wrong reading that genre please try again or check if the genre exists', error.message);
        return [];
    }
};
    //Update Genre By ID

export async function updateGenreByID( 
    id:number,
    updates: {game_genre: string})
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
        
        const query = `UPDATE Genres SET game_genre =? WHERE id = ?;`;
        const result = await db.run(query, [updates.game_genre]);
        if(result.changes === 0){
            return null;
        }
        console.log(`Genre with the id of ${id} Updated`);
        return {id, ...updates};
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
        console.error('Error deleting the genre:', error.message);
    }
}
//Platform Table 
export async function getAllPlatform() 
    {
        try{
            const db = await dbPromise;
            return db.all(`Select * FROM Plataforms`);
        }catch(error){
            
            console.log('Error reading the table', error.message);
        }
    };

export async function getPlatformById(id:number) {
    try{
        const db = await dbPromise;
        return db.get(`SELECT * FROM Plataforms WHERE id = ?;`);
    }catch(error){
        console.error(`The id: ${id} does not exist`);
    }
};

//USERS Table
//Create a user
export async function CreateUser(User: 
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
                console.error('Cant add the user please try again', error.message);
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
         console.error('Impossible to find all the users');
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
            console.error('Impossible to find this user', error.message)
            return [];
        }
    };
    //Update Userby id
export async function updateUserByID(
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
            const genreExist =  await db.get(`SELECT 1 FROM Users WHERE id  = ?`, id);
            if(!genreExist){
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
            console.error('Error updating the user:', error.message);
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
            console.error('Error deleting the User:', error.message);
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
        console.error('Impossible to add this review', error.message);
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
        console.error('Impossible to read all reviews', error.message);
        return [];
    }
}
    
//Read review By ID
export async function getReviewById(id:number) {
    try{
        const db = await dbPromise;
        const query = 
        `
        Select Reviews. * Users.userName, Videogames.gameName
        FROM Reviews
        JOIN Users ON Reviews.User_id = Users.id
        JOIN Videogames ON Reviews.Videogame_id = Videogames.id
        WHERE Reviews.id = ?;
        `;
        const review = await db.get(query, id);
        return review;
    }catch(error)
    { 
        console.error('Impossible to find this review', error.message)
        return [];
    }
};
//Update a review by ID

export async function updateReviewByID(
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
        console.error('Error updating the Review', error.message);
    }
};
//Remove review
export async function deleteReviewByID(id:number) {
    try{
        const db = await dbPromise;
        const query = `DELETE FROM Reviews WHERE id = ?`;
        await db.run(query, id);
        console.log(`Record with id of ${id} removed successfully`);
    }catch(error){
        console.error('Impossible to remove this record',error.message);
    }
};

//Companies TABLE
//Create Company 

export async function createCompany(company:{
    company_name: string
}) {
    try{
        const db = await dbPromise;
        const query = 
        `
        INSERT INTO Companies (company_name)
        VALUES (?);
        `
        const values = [
            company.company_name
        ];
        const  result = await db.run(query,values);
        console.log('Company added successfully');
        return result.lastID
    }catch(error){
        if(error.message.includes('UNIQUE constraint failed')){
            console.error('The company name already exists')
        }else{
            console.error('Impossible to add this company', error.message);
        }
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
        console.error('Impossible to read all companies', error.message);
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
        console.error('Impossible to find this review', error.message)
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
        console.error('Error updating the Company', error.message);
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
        console.error('Impossible to remove this record',error.message);
        throw new Error('Impossible to remove this company. Please try again');
    }
};
/*********************************
    JOIN TABLES
********************************/
//VideogamesPlataforms Table
//Add a videogame to a platform
export async function addVideogameToPlataform(videogameId:number, plataformsId: number) {
    const db = await dbPromise;

    try{
        await db.run(
            `INSERT INTO VideogamesPlataforms (videogame_id, plataform_id) VALUES (?,?)`,
            [videogameId, plataformsId]
        );
        console.log(`Videogame ${videogameId} successfully linked to ${plataformsId}`);
    }catch(error){
        console.error('Error linking videogame to the plataform',error.message);
    }
};

//Get All platforms associated with one game

export async function getPlataformsForVideogames(videogameId:number) {
    const db = await dbPromise;

    try{
        const plataforms = db.all(
            `SELECT plataform_name * FROM Plataforms
             INNER JOIN VideogamesPlataforms ON Plataform.id = VideogamesPlataforms.plataformsId
             WHERE VideogamePlataform.videogameId = ?'
            `,
            [videogameId]
        );
        return plataforms
    }catch(error){
        console.error('ERROR Fetching plataforms for a videogame', error.message);
        return [];
    }
};
// Get All Videogames associated with one platform
export async function getVideoGamesForPlataforms(plataformId:number) {
    const db = await dbPromise;

    try{
        const videogames = await db.all(
            `SELECT gameName * FROM Videogame
             INNER JOIN VideogamesPlataforms ON Videogame.id = VideogamesPlataforms.videogameId
             WHERE VideogamesPlataforms.plataformId = ?
            `,
            [plataformId]
        );
        return videogames;
    }catch(error){
        console.error('ERROR fetching Videogames for PLataforms', error.message);
        return [];
    }
}

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
        console.error('Error unlinking videogame from platform', error.message);
    }
}

//User_Favorites Table 

export async function addUserFavorites(userId:number, videogameId: number) {
    const db = await dbPromise;

    try{
        await db.run(
            `INSERT INTO User_Favorites (User_id, Videogame_id) VALUES (?, ?)`,
            [userId, videogameId]
        )
        console.log(`User ${userId} added this videogame ${videogameId} to favorites list`);
    }
    catch(error){
        console.error('Error adding this videogame to favorite list please try again later', error.message);
    }
}

//READ all favorites game for user
export async function getAllFavoritesForUser(userId:number) {
    const db = await dbPromise;
    
    try{
        const favorites = await db.run(
            `SELECT Videogame. * FROM Videogames
             INNER JOIN User_Favorites ON Videogame.id = User_Favorites.Videogame_id
             WHERE User_Favorites.User_id = ?
            `,
            [userId]
        )
        return favorites
    }
    catch(error){
        console.error('Error reading the favorites for user', error.message);
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
        console.error('Error removing videogame from user favorites list', error.message);
    }
}

//VIDEOGAMESGENRE TABLE
// Add genre to a videogame
export async function AddGenreToVideogame(videogameId:number, genreId: number) {
    const db = await dbPromise;

    try{

       await db.run( `
            INSERT INTO VideogamesGenre (videogameId, genresId) VALUES (?, ?)
            `,
            [videogameId, genreId]
        )
        console.log(`Added genre ${genreId} to ${videogameId}`);
    }catch(error){
        console.error('Error adding the genre to this videogame', error.message);
    }
}

//Delete genre from vdeogame

export async function removeVideogameGenre(videogameId:number, genreId: number) {
    const db = await dbPromise;

    try{
        db.run(
            `
            DELETE FROM VideogamesGenre WHERE videogameId = ? AND genreId = ?
            `,
            [videogameId, genreId]
        );
        console.log(`Removed Genre ${genreId} from ${videogameId}`);
    }
    catch(error){
        console.error('Error removing genre from videogame', error.message);
    }
}

//Select Genres for videogame

export async function getGenresForVideogame(videogameId:number) {
    const db = await dbPromise;

    try{
        const genres = db.run(
            `
            SELECT Genre.* FROM Genres
            INNER JOIN VideogamesGenre ON Genres.id = VideogamesGenre.genresId
            WHERE VideogamesGenre.videogameId = ?
            `,
            [videogameId]
        );
        return genres;
    }catch(error){
        console.error('Error selecting genres for videogame', error.message);
        return [];
    }
};

