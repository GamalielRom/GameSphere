
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById('createGameForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        data.critic_rating = Number(data.critic_rating);
        data.user_rating = Number(data.user_rating);
        data.trophies = Number(data.trophies);
        data.players = Number(data.players);
        data.company_id = Number(data.company_id);

        try {
          const response = await fetch('http://localhost:300/api/videogames', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          const result = await response.json();
          document.getElementById('message').innerText = result.message || 'Videogame created successfully!';
        } catch (error) {
          console.error('Error creating videogame:', error);
          document.getElementById('message').innerText = 'Error creating videogame. Please try again.';
        }
      });
    });