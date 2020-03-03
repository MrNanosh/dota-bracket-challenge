import React, {
  Component
} from 'react';
import './Match.scss';
class Match extends Component {
  render() {
    let { match } = this.props;
    return (
      <div
        className={`Match ${this.props.stage_number}_${this.props.match_number}`}
      >
        <div className="Match__team">
          {match[0].name
            ? match[0].name
            : '??????'}
        </div>
        <div className="Match__team b">
          {match[1].name
            ? match[1].name
            : '??????'}
        </div>
      </div>
    );
  }
}

export default Match;
