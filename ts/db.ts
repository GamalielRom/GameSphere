import {Database} from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
    filename:'Sources/videogamesDB/videogames.db',
            driver: Database,
});

export default dbPromise;
