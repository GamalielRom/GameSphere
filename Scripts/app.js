document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
    fetchGameDetails();
    const path = window.location.pathname.toLowerCase();
    if(path.includes("nintendo")){
        document.body.classList.add("nintendo");

     
    }else if(path.includes("pc")){
        document.body.classList.add("pc");
    }else if(path.includes("playstation")){
        document.body.classList.add("playstation");
    }else if(path.includes("xbox")){
        document.body.classList.add("xbox");
    }
});

function createImageNintendo(){
  
}

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

//Adding the fuctunality to the dashbioard page for all videogames

function displayGames(games, platform) {
    const gameGrid = document.getElementById("gameGrid");
    gameGrid.innerHTML = "";

    // Filter games based on selected platform
    const filteredGames = games.filter(game => game.platforms.includes(platform));

    filteredGames.forEach(game => {
        const name = game.gameName || "No Name";

        // Normalize the image path
        let imagePath = game.Image || "";
        
        // Check if image path is relative (doesn't start with a slash)
        if (imagePath && !imagePath.startsWith("/")) {
            imagePath = "/Image/Shared/" + imagePath;  // Ensure the correct directory
        }

        // Ensure we use the full path (or fallback to default image if missing)
        //const image = imagePath ? `http://localhost:3000${imagePath}` : "/Image/Shared/Alien_Isolation.jpg";
        const image = imagePath
        
        const genres = game.genres || "No Genres Available";

        console.log(`Gamename: ${name}, Image: ${image}, Genres: ${genres}, Platform: ${platform}`);

        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
            <img src="${image}" alt="${name}">
            <h3>${name}</h3>
            <p><strong>Genres:</strong> ${genres}</p>
        `;

        card.onclick = () => window.location.href = `/details.html?name=${encodeURIComponent(name)}`;
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

//Function for the Game details page
//Fetching the game we selected
async function fetchGameDetails() {
    try {
        //Gets the name from the game based on the url link
        const urlParams = new URLSearchParams(window.location.search);
        const gameName = urlParams.get("name");
        
        if (!gameName) {
            throw new Error("Game name not found in URL");
        }

        const response = await fetch(`http://localhost:300/api/videogames?name=${encodeURIComponent(gameName)}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch game details");
        }

        //Store the data we get in a constant
        const gameData = await response.json();
        //Find the specific game we selkected
        const game = Array.isArray(gameData) ? gameData.find(g => g.gameName === gameName) : gameData;

        if (!game) {
            throw new Error("Game not found");
        }
        //If the game is found, display the details page with the information from that game
        displayGameDetails(game);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
    
}

//Function that will display all the information from a Game
function displayGameDetails(game) {
    console.log("Game object received:", game);
    const detailsContainer = document.getElementById("gameDetails");
    
    if (!detailsContainer) {
        console.error("Game details container not found");
        return;
    }

    const imagePath = game.Image ;
    const company = game.company_name || "No Company Available";
    const trailer = game.Trailer || "There is no Trailer";
    const playstationLink = game.PlayStation_Link || "This game dont have a Playstation Link"
    const nintendoLink = game.Nintendo_Link || "This game dont have a Nintendo Link"
    const xboxLink = game.Xbox_Link || "This game dont have a Xbox Link"
    const steamLink = game.Steam_Link || "This game dont have a Steam Link"
    console.log(trailer)

    //Adding validation, if the game does not have a link realted to any of the trailer or official website buttons, the button will not be displayed in the website
    let buttonsHTML = "";

    if (trailer && trailer.trim() !== "There is no Trailer") {
        buttonsHTML += `<button class="trailer-btn"><a href="${trailer}" target="_blank">Trailer</a></button><br>`;
    }

    if (nintendoLink && nintendoLink.trim() !== "This game dont have a Nintendo Link") {
        buttonsHTML += `<button class="nintendo-button"><a href="${nintendoLink}" target="_blank">Nintendo Link</a></button><br>`;
    }

    if (playstationLink && playstationLink.trim() !== "This game dont have a Playstation Link") {
        buttonsHTML += `<button class="ps-button"><a href="${playstationLink}" target="_blank">Playstation Link</a></button><br>`;
    }

    if (xboxLink && xboxLink.trim() !== "This game dont have a Xbox Link") {
        buttonsHTML += `<button class="xbox-button"><a href="${xboxLink}" target="_blank">Xbox Link</a></button><br>`;
    }

    if (steamLink && steamLink.trim() !== "This game dont have a Steam Link") {
        buttonsHTML += `<button class="pc-button"><a href="${steamLink}" target="_blank">Steam Link</a></button><br>`;
    }

    function getYouTubeID(url) {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null; // Return video ID or null if not found
    }
    
    const trailerID = getYouTubeID(game.Trailer); // Extract YouTube ID
    
    console.log("Extracted YouTube ID:", trailerID); // Debugging
    
    detailsContainer.innerHTML = `
        <h1>${game.gameName}</h1>
        <div class="detail-split">
            <div class="game-box">
                <img src="${imagePath}" alt="${game.gameName} image">
            </div>
            <!-- Video Preview for Trailer -->
            <div class="game-box">
                <h2>Trailer</h2>
                ${
                    trailerID 
                        ? `<iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/${trailerID}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>`
                        : "<p>No trailer available.</p>"
                    }
            </div>
             <div class="game-box">
                <p><strong>Description:</strong> ${game.Description || "No description available."}</p>
                <p><strong>Critic Rating:</strong> ${game.critic_rating || "Unknown"}</p>
                <p><strong>User Rating:</strong> ${game.user_rating || "Unknown"}</p>
                <p><strong>Players:</strong> ${game.players || "Unknown"}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Genres:</strong> ${game.genres || "No Genres Available"}</p>
                <p><strong>Platforms:</strong> ${game.platforms || "Unknown"}</p>
            </div>
            <div class="game-box">
                ${buttonsHTML}
            </div>
            <button><a href="javascript:history.back()">Back to Games List</a></button>
        </div>
        
    `;
}
