import express from 'express';

import companiesRoute from './companiesRoute';
import genresRoute from './genresRoute';
import  platformsRoute from './platformsRoute';
import reviewRoute from './reviewsRoute';
import userFavoritesRoute from './userFavoritesRoute';
import usersRoute from './usersRoute';
import videogameGenreRoute from './videogameGenreRoute';
import videogamePlatforms from './videogamePlatformsRoute';
import videogamesRoute from './videogamesRoute';

const app = express();
app.use(express.json());

app.use('/api/companies', companiesRoute);
app.use('/api/genres', genresRoute);
app.use('/api/platforms', platformsRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/userFavorites', userFavoritesRoute);
app.use('/api/users', usersRoute);
app.use('/api/videogames', videogamesRoute);
app.use('/api/videogamesGenre', videogameGenreRoute);
app.use('/api/videogamePlatforms', videogamePlatforms);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
const PORT = 300;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app 