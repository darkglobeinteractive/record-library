import React, { Component, request } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import FilterArtist from './FilterArtist';
import FilterGenre from './FilterGenre';
import RecordTable from './RecordTable';

class App extends Component {

  constructor(props) {

    super(props);

    // Initialize state
    this.state = {
      records: [],
      filters: {
        artist: '',
        genre: ''
      },
      sorting: {
        artist: '',
        album: ''
      }
    }

  }

  componentDidMount() {

    // Create variable for Google Sheet
    const csv_sheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIsCYANHRylGZ2S3kxHNTwzzbWEpY43lAJvOHr_1cyHZTjdLzGNH5mvjDjbI2z3ZgIx2_8FYEmnkzT/pub?gid=0&single=true&output=csv';

    // Use axios to GET the data from the Google Sheet
    axios({
      method: 'get',
      url: csv_sheet
    })
    .then((res) => {

      // Use csvtojson to handle the data received from the axios request
      csv({
        noheader: false,
      })
      .fromString(res.data)
      .then((jsonObj) => {

        // Populate the state.records array with records data
        for(let i = 0; i < jsonObj.length; i++) {
          this.setState({
            records: [...this.state.records, {
              'order': i+1,
              'artist': jsonObj[i]['Artist'],
              'album': jsonObj[i]['Album'],
              'origin': jsonObj[i]['Origin'],
              'og': jsonObj[i]['OG / Reissue'],
              'condition': jsonObj[i]['Condition'],
              'mono': jsonObj[i]['Mono?'],
              'genre': jsonObj[i]['Filed'],
              'notes': jsonObj[i]['Notes']
            }]
          });
        }

      });

    });

  }

  renderFilters() {
    if (this.state.records.length === 0) {
      return <></>;
    }
    return (
      <div>
        <strong>Filter By:</strong>
        <FilterArtist />
        <FilterGenre />
        <button className="ui button">Reset All</button>
      </div>
    );
  }

  // Helper function will return a loading screen until we've got records in state
  renderTable() {
    if (this.state.records.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <RecordTable records={this.state.records} />
    );
  }

  render() {
    return (
      <div>
        {this.renderFilters()}
        {this.renderTable()}
      </div>
    );
  }
}

export default App;
