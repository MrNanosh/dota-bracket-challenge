import React from 'react';
import './App.css';
import config from '../config';
import apiService from '../api-service';

class App extends React.Component {
  state = {
    teams: []
  };

  async componentDidMount() {
    const response = await fetch(
      config.getAllTeams
    );
    try {
      if (response.ok) {
        let allTeams = await response.json();
        // probably not necessary but just in case it's not sorted
        allTeams = allTeams.sort(
          (a, b) => b.rating - a.rating
        );
        let teams = allTeams.slice(
          0,
          16
        );

        teams = await teams.map(
          team => {
            // get players
            const players = apiService.getPlayers(
              team.team_id
            );
            return { ...team, players };
          }
        );
        this.setState({
          teams
        });
        console.log(this.state);
      } else {
        throw new Error(
          'could not get teams'
        );
      }
    } catch (error) {}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <main>
          {this.state.teams.map(
            team => (
              <ul key={team.team_id}>
                <li>
                  team:{''}
                  {team.name}
                </li>
                <li>
                  rating:{''}
                  {team.rating}
                </li>
              </ul>
            )
          )}
        </main>
      </div>
    );
  }
}

export default App;
