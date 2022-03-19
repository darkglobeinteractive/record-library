import React from 'react';
import RecordRow from './RecordRow';

class RecordTable extends React.Component {

  // Render the record rows from the props.records array
  renderRecords() {
    return this.props.records.map((record, index) => {
      return (
        <RecordRow
          key={index}
          record={record}
          setArtist={this.props.setArtist}
        />
      );
    });
  }

  // We can render without worry because we're checking for state.records.length > 0 in App.js
  render() {

    // Create possible sorting classes for the Artist or Album table headers
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
