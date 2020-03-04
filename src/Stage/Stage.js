import React, {
  Component
} from 'react';
import Match from '../Match/Match';
import Bracket from '../Bracket/Bracket';
import apiService from '../api-service';
import config from '../config';
import './Stage.scss';
class Stage extends Component {
  render() {
    const {
      stage_number,
      matches
    } = this.props;
    let matches1 = matches.slice(
      0,
      matches.length / 2
    );
    let matches2 = matches.slice(
      matches.length / 2
    );

    //check for the next stage only if there are a matches>0
    return (
      <div
        className={`Stage_${stage_number}`}
      >
        <div className="Stage__division A">
          {matches1.length > 0 &&
            matches1.map(
              (match, index) => {
                return (
                  <Match
                    key={index}
                    match={match}
                    stage_number={
                      this.props
                        .stage_number
                    }
                    match_number={index}
                  ></Match>
                );
              }
            )}
          {/* <div className="Stage_next">
            {this.decideNextStage(
              matches1
            )}
          </div> */}
        </div>{' '}
        <div className="Stage__division B">
          {matches2.length > 0 &&
            matches2.map(
              (match, index) => {
                return (
                  <Match
                    key={index}
                    match={match}
                    stage_number={
                      this.props
                        .stage_number
                    }
                    match_number={index}
                  ></Match>
                );
              }
            )}
          <div className="Stage_next">
            {/* <Bracket teams={}></Bracket> */}
          </div>
        </div>{' '}
      </div>
    );
  }
}
export default Stage;
