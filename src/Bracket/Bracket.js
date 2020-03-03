import React, {
  Component
} from 'react';
import Stage from '../Stage/Stage';

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
      console.log(this.props.teams);
      initialMatches.push([
        teams[team],
        teams[teams.length - 1 - team]
      ]);
    }
    this.state = {
      initialMatches:
        initialMatches || []
    };
  }

  render() {
    console.log(this.props);
    console.log(
      this.state.initialMatches
    );
    return (
      <div className="Bracket">
        <Stage
          matches={
            this.state.initialMatches
          }
          stage_number={1}
        ></Stage>
      </div>
    );
  }
}

export default Bracket;
