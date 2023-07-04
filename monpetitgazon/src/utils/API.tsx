const API = {
    fetchClubs: async () => {
        try {
            const response = await fetch(
              "https://api.mpg.football/api/data/championship-clubs"
            );
            const data = await response.json();
            return data.championshipClubs;
          } catch (error) {
            console.error("Error fetching clubs:", error);
          }
    },
    fetchPlayers: async () => {
        try {
            const response = await fetch(
              "https://api.mpg.football/api/data/championship-players-pool/1"
            );
            const data = await response.json();
            return data.poolPlayers;
          } catch (error) {
            console.error("Error fetching players:", error);
          }
    },
    fetchPlayerDetail: async (playerId: String) => {
        try {
            const response = await fetch(
                `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2022`
            );
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error fetching clubs:", error);
          }
    },
}

export default API;