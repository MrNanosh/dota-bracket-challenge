import React, {
  Component
} from 'react';
import Match from '../Match/Match';
class Stage extends Component {
  render() {
    const {
      stage_number,
      matches
    } = this.props;
    return (
      <div
        className={`Stage ${stage_number}`}
      >
        {matches.length > 0 &&
          matches.map(
            (match, index) => {
              return (
                <Match
                  key={index}
                  match={match}
                ></Match>
              );
            }
          )}
      </div>
    );
  }
}
export default Stage;
