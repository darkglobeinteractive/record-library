import React from 'react';
import RecordRow from './RecordRow';

class RecordTable extends React.Component {

  renderRecords() {
    return this.props.records.map((record, index) => {
      return <RecordRow key={index} record={record} />;
    });
  }

  // We know state has records so we don't need logic here
  render() {
    return (
      <div className="records-container">
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Album</th>
              <th>Origin</th>
              <th>OG?</th>
              <th>Condition</th>
              <th>Mono?</th>
              <th>Genre</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRecords()}
          </tbody>
        </table>
      </div>
    );
  }

}

export default RecordTable;
