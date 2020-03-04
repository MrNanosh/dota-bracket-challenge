import React, {
  Component
} from 'react';
import './Match.scss';
import apiService from '../api-service';
class Match extends Component {
  state = {
    teamAHover: false,
    teamBHover: false,
    teamAPlayers: [],
    teamBPlayers: []
  };

  async componentDidMount() {
    let teamAPlayers = [];
    let teamBPlayers = [];
    if (this.props.match[0].team_id) {
      teamAPlayers = await apiService.getPlayers(
        this.props.match[0].team_id
      );
    }
    if (this.props.match[1].team_id) {
      teamBPlayers = await apiService.getPlayers(
        this.props.match[1].team_id
      );
    }
    await this.setState({
      teamAPlayers,
      teamBPlayers
    });
  }

  renderInfoA = () => {
    if (this.state.teamAHover) {
      if (
        this.state.teamAPlayers.length >
        0
      ) {
        return (
          <div className="Match__info a">
            <div className="innerBox">
              <h3>Players:</h3>
              <ul>
                {this.state.teamAPlayers.map(
                  (player, index) => {
                    return (
                      <li
                        key={player.id}
                      >
                        {player.name
                          ? player.name
                          : '?????'}
                        {index ===
                        this.state
                          .teamAPlayers
                          .length -
                          1
                          ? ''
                          : ', '}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>{' '}
          </div>
        );
      } else {
        return;
      }
    }
  };

  renderInfoB = () => {
    if (this.state.teamBHover) {
      if (
        this.state.teamBPlayers.length >
        0
      ) {
        return (
          <div className="Match__info b">
            <div className="innerBox">
              <h3>Players:</h3>
              <ul>
                {this.state.teamBPlayers.map(
                  (player, index) => {
                    return (
                      <li
                        key={player.id}
                      >
                        {player.name
                          ? player.name
                          : '?????'}
                        {index ===
                        this.state
                          .teamBPlayers
                          .length -
                          1
                          ? ''
                          : ', '}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>{' '}
          </div>
        );
      } else {
        return;
      }
    }
  };

  handleHoverOverA = event => {
    event.target.style.background =
      'red';
    this.setState({
      ...this.state,
      teamAHover: true
    });
  };

  handleHoverOverB = event => {
    event.target.style.background =
      'red';
    this.setState({
      ...this.state,
      teamBHover: true
    });
  };

  handleHoverLeaveA = event => {
    event.target.style.background =
      'none';
    this.setState({
      ...this.state,
      teamAHover: false
    });
  };

  handleHoverLeaveB = event => {
    event.target.style.background =
      'none';
    this.setState({
      ...this.state,
      teamBHover: false
    });
  };

  render() {
    let { match } = this.props;
    return (
      <div
        className={`Match ${this.props.stage_number}_${this.props.match_number}`}
      >
        {this.renderInfoA()}
        <div
          className="Match__team a"
          style={{}}
          onMouseOver={
            this.handleHoverOverA
          }
          onMouseLeave={
            this.handleHoverLeaveA
          }
        >
          {match[0].name
            ? match[0].name
            : '??????'}
        </div>
        {this.renderInfoB()}
        <div
          className="Match__team b"
          onMouseOver={
            this.handleHoverOverB
          }
          onMouseLeave={
            this.handleHoverLeaveB
          }
        >
          {match[1].name
            ? match[1].name
            : '??????'}
        </div>
      </div>
    );
  }
}

export default Match;
