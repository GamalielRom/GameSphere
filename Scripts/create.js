
    /*
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
        async function populateSelects() {
          try {
              // Obtener las compañías
              const companiesResponse = await fetch('http://localhost:300/api/companies');
              if (!companiesResponse.ok) throw new Error('Failed to fetch companies');
              const companies = await companiesResponse.json();
      
              const companySelect = document.getElementById('company_id');
              companies.forEach(company => {
                  const option = document.createElement('option');
                  option.value = company.id; // Asumiendo que la propiedad es 'id'
                  option.textContent = company.company_name; // Asegúrate de que la propiedad se llame así
                  companySelect.appendChild(option);
              });
      
              // Obtener las plataformas
              const platformsResponse = await fetch('http://localhost:300/api/platforms');
              if (!platformsResponse.ok) throw new Error('Failed to fetch platforms');
              const platforms = await platformsResponse.json();
      
              const platformSelect = document.getElementById('platform_id');
              platforms.forEach(platform => {
                  const option = document.createElement('option');
                  option.value = platform.id; // Asegúrate de que la propiedad es 'id'
                  option.textContent = platform.plataform_name; // Asegúrate de que la propiedad se llama así
                  platformSelect.appendChild(option);
              });
          } catch (error) {
              console.error('Error populating selects:', error);
          }
      }
      });
      populateSelects();
    });*/
    async function populateSelects() {
      try {
          // Obtener las compañías
          const companiesResponse = await fetch('http://localhost:300/api/companies');
          if (!companiesResponse.ok) throw new Error('Failed to fetch companies');
          const companies = await companiesResponse.json();
  
          const companySelect = document.getElementById('company_id');
          companies.forEach(company => {
              const option = document.createElement('option');
              option.value = company.id; // Asumiendo que la propiedad es 'id'
              option.textContent = company.company_name; // Asegúrate de que la propiedad se llame así
              companySelect.appendChild(option);
          });
  
          // Obtener las plataformas
          const platformsResponse = await fetch('http://localhost:300/api/platforms');
          if (!platformsResponse.ok) throw new Error('Failed to fetch platforms');
          const platforms = await platformsResponse.json();
  
          const platformSelect = document.getElementById('platform_id');
          platforms.forEach(platform => {
              const option = document.createElement('option');
              option.value = platform.id; // Asegúrate de que la propiedad es 'id'
              option.textContent = platform.plataform_name; // Asegúrate de que la propiedad se llama así
              platformSelect.appendChild(option);
          });
      } catch (error) {
          console.error('Error populating selects:', error);
      }
  }
  document.addEventListener("DOMContentLoaded", () => {
    populateSelects();
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
      async function populateSelects() {
        try {
            // Obtener las compañías
            const companiesResponse = await fetch('http://localhost:300/api/companies');
            if (!companiesResponse.ok) throw new Error('Failed to fetch companies');
            const companies = await companiesResponse.json();
    
            const companySelect = document.getElementById('company_id');
            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company.id; // Asumiendo que la propiedad es 'id'
                option.textContent = company.company_name; // Asegúrate de que la propiedad se llame así
                companySelect.appendChild(option);
            });
    
            // Obtener las plataformas
            const platformsResponse = await fetch('http://localhost:300/api/platforms');
            if (!platformsResponse.ok) throw new Error('Failed to fetch platforms');
            const platforms = await platformsResponse.json();
    
            const platformSelect = document.getElementById('platform_id');
            platforms.forEach(platform => {
                const option = document.createElement('option');
                option.value = platform.id; // Asegúrate de que la propiedad es 'id'
                option.textContent = platform.plataform_name; // Asegúrate de que la propiedad se llama así
                platformSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error populating selects:', error);
        }
    }
    });
});