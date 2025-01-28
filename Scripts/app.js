document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
});

async function fetchGames() {
    try {
        const [gamesResponse,] = await Promise.all([
            fetch('http://localhost:300/api/videogames')
        ]);

        if (!gamesResponse.ok) {
            throw new Error('Failed to fetch all data');
        }

        const games = await gamesResponse.json();
        //const genres = await genresResponse.json();
        //const platforms = await platformsResponse.json();

        console.log('Games:', games);
        //console.log('Genres:', genres);
        //console.log('Platforms:', platforms);

        displayGames(games);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Tony fixee el problema ahora deberia de estar funcionando pero si podes hacer que esto encuentre con el js los generos por el videojuego fuera increible
//tecnicamente lee todos los datos si seguis esta logica de todo el codigo podras entender como acceder a todas las apis.
//te lo dejo para que lo testees todo lo que querras 
function displayGames(games) {
    games.forEach(game => {
        console.log('Game:', game);
        const name = game.gameName;
        const description = game.Description;
        const image = game.image || 'default-image.jpg';
        //const imageUrl = "http://localhost:3000/" + game.image;  // Complete image URL
        
        // Extract genres and platforms directly from the game object
        const genres = game.genres || 'No Genres Available';
        const platforms = game.platforms || 'No Platforms Available';

        console.log(`Gamename: ${name},\nDescription: ${description},\nImage: ${image},\nGenres: ${genres},\nPlatforms: ${platforms}`);

        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-item');
        gameContainer.innerHTML = `
            <h3>${name || 'No Name'}</h3>
            <p>${description || 'No Description Available'}</p>
            <p><strong>Genres:</strong> ${genres}</p>
            <p><strong>Platforms:</strong> ${platforms}</p>
            <img src="${image}" alt="${name || 'No Image'}">
        `;
        document.body.appendChild(gameContainer);
    });
}
/*function displayGames(games,genres,platforms) {
    games.forEach(game => {
        console.log('Game:', game);
        const name = game.gameName;
        const description = game.Description;
        const image = game.image || `default-image.jpg`;
        //segundo for each para genero y platforms
        // Assuming you need to match genres and platforms by gameId
        // Find all genres linked to the game by its ID
        const gameGenres = genres ? genres.filter(g => g.videogameId === game.id).map(g => g.game_genre) : [];
        const genre = gameGenres.length > 0 ? gameGenres.join(', ') : 'No Genres Available';

        const platform = platforms ? platforms.find(p => p.gameId === game.gameId)?.platformName : 'No Platforms Available';

        console.log(`Gamename ${name},\ndescriptiopn ${description},\nimg ${image},\ngenres ${genre}`);

        const gameContainer = document.createElement(`div`);
        gameContainer.classList.add('game=item');
        gameContainer.innerHTML = `
        <h3>${name || 'No Name'}</h3>
        <p>${description || 'No Description Available'}</p>
        <p>${genre}</p>
        <p>${platform || 'No Platforms Available'}</p>
        <img src="${image}" alt="${name || 'No Image'}">
    `;
    document.body.appendChild(gameContainer);
    });
    
};*/