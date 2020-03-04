import React, {
  Component
} from 'react';
import Stage from '../Stage/Stage';
import apiService from '../api-service';
import config from '../config';

class Bracket extends Component {
  constructor(props) {
    super(props);
    let teams = this.props.teams;
    let initialMatches = [];

    // match teams together assuming an even number of teams
    for (
      let team = 0;
      team < teams.length / 2;
      team++
    ) {
      initialMatches.push([
        teams[team],
        teams[teams.length - 1 - team]
      ]);
    }
    this.state = {
      initialMatches:
        initialMatches || [],
      stage2: null,
      stage3: null,
      stage4: null
    };
  }
  async componentDidMount() {
    let { initialMatches } = this.state;
    let stage2 = await this.decideNextStage(
      initialMatches || []
    );
    await this.setState({ stage2 });
    let stage3 = await this.decideNextStage(
      stage2 || []
    );
    await this.setState({ stage3 });
    let stage4 = await this.decideNextStage(
      stage3 || []
    );
    await this.setState({ stage4 });
  }

  async decideNextStage(
    initialMatches
  ) {
    let initMatches = [
      ...initialMatches
    ];

    let winners = [];

    for (let match of initMatches) {
      //get matches
      let opposing_id;
      let last_matchup;
      if (match[0].team_id) {
        let matches = await apiService.getMatches(
          match[0].team_id
        );
        //compare opposing team ids for the matching match
        //assuming it was the latest match for them
        opposing_id = match[1].team_id;

        last_matchup = matches.find(
          match =>
            match.opposing_team_id ===
            opposing_id
        );
      } else {
        last_matchup = null;
      }
      //only counts it if it's within tournament time. assumes that they are not allowed to face each other casually.
      if (
        last_matchup &&
        last_matchup.opposing_team_id ===
          opposing_id &&
        last_matchup.start_time >=
          config.TOURNAMENT_START_TIME
      ) {
        const {
          radiant,
          radiant_win
        } = last_matchup;
        let winning_id =
          (radiant && radiant_win) ||
          (!radiant && !radiant_win)
            ? match[0].team_id
            : opposing_id;
        //get the winner of that match and push it to winners
        winners.push(
          match.find(
            team =>
              team.team_id ===
              winning_id
          )
        );
      } else {
        //if there is no winner then give a object where name is null
        winners.push({
          team_id: null,
          rating: null,
          wins: null,
          losses: null,
          last_match_time: null,
          name: '',
          tag: '',
          logo_url: ''
        });
      }
    }
    //in the case you get to the end of your block
    if (winners.length === 1) {
      this.setState({
        semiFinals: true
      });
      return;
    }
    //next matchups
    let nextMatches = [];
    for (
      let i = 1;
      i < winners.length;
      i += 2
    ) {
      nextMatches.push([
        winners[i - 1],
        winners[i]
      ]);
    }

    return nextMatches;
  }

  renderNextStages() {
    let {
      stage2,
      stage3,
      stage4
    } = this.state;
    let stage = [];
    if (stage2) {
      stage.push(
        <Stage
          key={2}
          matches={stage2}
          stage_number={2}
        ></Stage>
      );
    }
    if (stage3) {
      stage.push(
        <Stage
          key={3}
          matches={stage3}
          stage_number={3}
        ></Stage>
      );
    }
    if (stage4) {
      stage.push(
        <Stage
          key={4}
          matches={stage4}
          stage_number={4}
        ></Stage>
      );
    }
    return stage;
  }

  render() {
    return (
      <div className="Bracket">
        <Stage
          key={1}
          matches={
            this.state.initialMatches
          }
          stage_number={1}
        ></Stage>
        {this.renderNextStages()}
      </div>
    );
  }
}

export default Bracket;
