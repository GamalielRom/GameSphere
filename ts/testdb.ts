import  {Database}  from "sqlite3";
import { open } from 'sqlite';

(async () => {
    try{
        const db = await open({
            filename: 'Sources/videogamesDB/videogames.db',
            driver: Database,
        });
        console.log('Succesfull conexion from the database');

        const tables = await db.all(
            `SELECT name FROM sqlite_master WHERE type='table';`
        );
        console.log('tables found it', tables);
        await db.close();
    }catch(error){
        console.error('Issues found when try to connect the database', error)
    }
})();

