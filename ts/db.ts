import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
    filename: '/Sources/videogamesDB/videogames.db',
    driver: sqlite3.Database,
});

const videogames = await db.all('SELECT * FROM Videogames');
console.log(videogames);
