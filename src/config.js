export default {
  getAllTeams:
    'https://api.opendota.com/api/teams',
  getTeamPlayers: team_id => {
    return `https://api.opendota.com/api/teams/${team_id}/players`;
  },
  getTeamMatches: team_id => {
    return `https://api.opendota.com/api/teams/${team_id}/matches`;
  },
  getTeamHeroes: team_id => {
    return `https://api.opendota.com/api/teams/${team_id}/heroes`;
  }
};
