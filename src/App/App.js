import React from 'react';
import './App.css';
import config from '../config';
import apiService from '../api-service';
import Bracket from '../Bracket/Bracket';

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
        console.log(teams);

        teams = teams.map(team => {
          // get players
          const players = apiService.getPlayers(
            team.team_id
          );
          console.log(team);
          return { ...team, players };
        });
        console.log(teams);
        return this.setState({
          teams
        });
      } else {
        throw new Error(
          'could not get teams'
        );
      }
    } catch (error) {}
  }

  render() {
    let { teams } = this.state;
    return (
      <div className="App">
        <header className="App-header"></header>
        <main>
          {teams.length > 0 && (
            <Bracket
              teams={teams}
            ></Bracket>
          )}
        </main>
      </div>
    );
  }
}

export default App;
