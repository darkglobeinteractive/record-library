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

    let artistClasses = 'default';
    if (this.props.sorting.artist !== '') {
      artistClasses = `sorted ${this.props.sorting.artist}`;
    };
    let albumClasses = 'default';
    if (this.props.sorting.album !== '') {
      albumClasses = `sorted ${this.props.sorting.album}`;
    };

    return (
      <div className="ui segment records-container">
        <table className="ui sortable celled table">
          <thead>
            <tr>
              <th className={artistClasses} onClick={() => this.props.columnSort('artist')}>Artist</th>
              <th className={albumClasses} onClick={() => this.props.columnSort('album')}>Album</th>
              <th className="no-sort">Origin</th>
              <th className="no-sort">OG?</th>
              <th className="no-sort">Condition</th>
              <th className="no-sort">Mono?</th>
              <th className="no-sort">Genre</th>
              <th className="no-sort">Notes</th>
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
