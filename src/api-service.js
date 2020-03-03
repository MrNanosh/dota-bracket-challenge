import config from './config';

const apiService = {
  async getPlayers(team_id) {
    const response = await fetch(
      config.getTeamPlayers(team_id)
    );
    let json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return json.error;
    }
  },
  async getHeroes(team_id) {
    const response = await fetch(
      config.getTeamHeroes(team_id)
    );
    let json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return json.error;
    }
  },
  async getMatches(team_id) {
    const response = await fetch(
      config.getTeamMatches(team_id)
    );
    let json = await response.json();

    if (response.ok) {
      return json;
    } else {
      return json.error;
    }
  }
};

export default apiService;
