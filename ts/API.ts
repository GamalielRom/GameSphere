import express, {request, response} from 'express';
import {getAllVideogames} from './CRUD';

const app = express();

const port = 3000;

//Endpoint to obtain all the games

app.get('/')