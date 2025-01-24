document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
});

async function fetchGames() {
    try {
        const response = await fetch(' http://localhost:300/api/videogames');
        if (!response.ok) throw new Error('Failed to fetch games');
        const games = await response.json();
        console.log('Games recived:', games)
        displayGames(games);
    } catch (error) {
        console.error('Error fetching games:', error);
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
        const image = game.image || `default-image.jpg`

        console.log(`Gamename ${name}, descriptiopn ${description}, img ${image}`);

        const gameContainer = document.createElement(`div`);
        gameContainer.classList.add('game=item');
        gameContainer.innerHTML = `
        <h3>${name || 'No Name'}</h3>
        <p>${description || 'No Description Available'}</p>
        <img src="${image}" alt="${name || 'No Image'}">
    `;
    document.body.appendChild(gameContainer);
    });
    
};