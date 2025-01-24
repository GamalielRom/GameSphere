document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
});

async function fetchGames() {
    try {
        const response = await fetch(' http://localhost:300/api/videogames');
        if (!response.ok) throw new Error('Failed to fetch games');
        
        const games = await response.json();
        displayGames(games);
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

function displayGames(games) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <h3>${videogame.gameName}</h3>
            <p>${videogame.Description}</p>
            <img src="${videogame.Image}" alt="${game.gameName}">
        `;
        container.appendChild(gameCard);
    });
}