document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
});

async function fetchGames() {
    try {
        const [gamesResponse] = await Promise.all([
            fetch('http://localhost:300/api/videogames')
        ]);

        if (!gamesResponse.ok) {
            throw new Error('Failed to fetch all data');
        }

        const games = await gamesResponse.json();

        console.log('Games:', games);

        // Determine platform based on the current URL
        //Using windows location to determine the website path
        const path = window.location.pathname;
        let platform = "";
        if (path.includes("/Xbox/")) {
            platform = "Xbox";
        } else if (path.includes("/PC/")) {
            platform = "PC";
        } else if (path.includes("/PlayStation/")) {
            platform = "PlayStation";
        } else if (path.includes("/Nintendo/")) {
            platform = "Nintendo";
        }else{
            platform = null;
        }

        displayGames(games, platform);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Tony fixee el problema ahora deberia de estar funcionando pero si podes hacer que esto encuentre con el js los generos por el videojuego fuera increible
//tecnicamente lee todos los datos si seguis esta logica de todo el codigo podras entender como acceder a todas las apis.
//te lo dejo para que lo testees todo lo que querras 
/*function displayGames(games) {
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
*/
//Adding the fuctunality to the dashbioard page for all videogames

function displayGames(games, platform) {
    const gameGrid = document.getElementById("gameGrid");
    gameGrid.innerHTML = "";
    
    // Filter games based on selected platform
    const filteredGames = games.filter(game => game.platforms.includes(platform));
    
    filteredGames.forEach(game => {
        const name = game.gameName || 'No Name';
        const image = game.Image ? `http://localhost:3000/${game.Image}` : 'default-image.jpg';
        const genres = game.genres || 'No Genres Available';

        console.log(`Gamename: ${name}, Image: ${image}, Genres: ${genres}, Platform: ${platform}`);
        
        const card = document.createElement("div");
        card.className = "game-card";
        
        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p><strong>Genres:</strong> ${genres}</p>
        `;
        
        card.onclick = () => window.location.href = `/game-details.html?name=${encodeURIComponent(name)}`;
        gameGrid.appendChild(card);
    });
}


function filterGames() {
    const search = document.getElementById("search").value.toLowerCase();
    const genre = document.getElementById("genre").value;
    fetchGames().then(() => {
        const filteredGames = Array.from(document.querySelectorAll(".game-card")).filter(card => {
            const name = card.querySelector("h3").innerText.toLowerCase();
            const genres = card.querySelector("p").innerText.toLowerCase();
            return name.includes(search) && (genre === "" || genres.includes(genre.toLowerCase()));
        });
        document.getElementById("gameGrid").innerHTML = "";
        filteredGames.forEach(card => document.getElementById("gameGrid").appendChild(card));
    });
}

document.getElementById("search").addEventListener("keyup", filterGames);
document.getElementById("genre").addEventListener("change", filterGames);
