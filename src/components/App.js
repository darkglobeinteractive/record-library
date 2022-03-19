import React, { Component, request } from 'react';
import axios from 'axios';
import csv from 'csvtojson';
import _ from 'lodash';
import './App.css';
import FilterArtist from './FilterArtist';
import FilterGenre from './FilterGenre';
import RecordTable from './RecordTable';
import Spinner from './Spinner';

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

        // Create an array to hold the records
        const recordsArr = [];

        // Populate the records array
        for(let i = 0; i < jsonObj.length; i++) {
          recordsArr.push({
            'order': i+1,
            'artist': jsonObj[i]['Artist'],
            'album': jsonObj[i]['Album'],
            'origin': jsonObj[i]['Origin'],
            'og': jsonObj[i]['OG / Reissue'],
            'condition': jsonObj[i]['Condition'],
            'mono': jsonObj[i]['Mono?'],
            'genre': jsonObj[i]['Filed'],
            'notes': jsonObj[i]['Notes'],
            'visibility': 'show'
          });
        }

        // Set the records state with final array
        this.setState({
          records: recordsArr
        });

      });

    });

  }

  // Handle the Reset All button clicks
  handleResetAll = () => {

    // Create an array that resets the original order of the records and sets them all to visible
    const recordsArr = this.state.records.sort((a, b) => (a.order > b.order) ? 1 : -1).map(record => {
      return {...record, visibility: 'show'};
    });

    // Reset the state
    this.setState({
      records: recordsArr,
      filters: {
        artist: '',
        genre: ''
      },
      sorting: {
        artist: '',
        album: ''
      }
    });

  }

  // Handle the sorting via column headers
  handleColumnSorting = col => {

    // Set default order values and create an empty array to hold the sorted records
    let artistOrder, albumOrder = '';
    let recordsArr = [];

    // Handle Artist column sorting
    if (col === 'artist') {

      // Determine the new sorting direction
      artistOrder = (this.state.sorting.artist === '' ? 'ascending' : (this.state.sorting.artist === 'ascending' ? 'descending' : 'ascending'));

      // If ascending: artists ASC, albums ASC
      if (artistOrder === 'ascending') {
        recordsArr = this.state.records.sort((a, b) => (a.artist > b.artist) ? 1 : (a.artist === b.artist) ? ((a.album > b.album) ? 1 : -1) : -1);

      // If descending: artists DESC, albums ASC
      } else {
        recordsArr = this.state.records.sort((a, b) => (a.artist > b.artist) ? -1 : (a.artist === b.artist) ? ((a.album < b.album) ? -1 : 1) : 1 )
      }

    }

    // Handle Album column sorting
    if (col === 'album') {

      // Determine the new sorting direction
      albumOrder = (this.state.sorting.album === '' ? 'ascending' : (this.state.sorting.album === 'ascending' ? 'descending' : 'ascending'));

      // If ascending: albums ASC
      if (albumOrder === 'ascending') {
        recordsArr = this.state.records.sort((a, b) => (a.album > b.album) ? 1 : -1);

      // If descending: albums DESC
      } else {
        recordsArr = this.state.records.sort((a, b) => (a.album > b.album) ? -1 : 1);
      }

    }

    // Set the state
    this.setState({
      records: recordsArr,
      sorting: {
        album: albumOrder,
        artist: artistOrder
      }
    });

  }

  // Handle the filters
  handleFilters = (filter, value) => {

    // Filters are additive, so retain existing filter state if it's not being set here
    const genreFilter = (filter === 'genre' ? value : this.state.filters.genre);
    const artistFilter = (filter === 'artist' ? value : this.state.filters.artist);

    // Create array to hold new records state
    const recordsArr = this.state.records.map(record => {

      // Set default visibility to show the record
      let visibility = 'show';

      // If we're filtering by genre and this record isn't of that genre, hide the record
      if (genreFilter !== '' && record.genre !== genreFilter) {
        visibility = 'hide';
      }

      // If we're filtering by artist and this record isn't by that artist, hide the record
      if (artistFilter !== '' && record.artist !== artistFilter) {
        visibility = 'hide';
      }

      // Return the record with the visibility set
      return {...record, visibility};

    });

    // Set the state
    this.setState({
      records: recordsArr,
      filters: {
        artist: artistFilter,
        genre: genreFilter
      }
    })
  }

  // Render the filters section
  renderFilters() {

    // Create arrays of unique artists and genres sorted ASC
    const genres = _.sortedUniq(_.sortBy(this.state.records.map(record => record.genre)));
    const artists = _.sortedUniq(_.sortBy(this.state.records.map(record => record.artist)));

    // Return the JSX
    return (
      <div className="ui segment filters">
        <div className="title">Filter By:</div>
        <FilterArtist
          artists={artists}
          selectedArtist={this.state.filters.artist}
          setArtist={this.handleFilters}
        />
        <FilterGenre
          genres={genres}
          selectedGenre={this.state.filters.genre}
          setGenre={this.handleFilters}
        />
        <button className="ui button reset-all" onClick={() => this.handleResetAll()}>Reset All</button>
      </div>
    );
  }

  // Render the RecordTable component
  renderTable() {
    return (
      <RecordTable
        records={this.state.records}
        sorting={this.state.sorting}
        columnSort={this.handleColumnSorting}
      />
    );
  }

  render() {

    // If there are no records, only show the Spinner component
    if (this.state.records.length === 0) {
      return (
        <Spinner message="Loading" />
      );
    }

    // Otherwise, return the Filters and Records
    return (
      <div className="ui segment">
        <h1 className="ui header">My Record Collection</h1>
        {this.renderFilters()}
        {this.renderTable()}
      </div>
    );

  }

}

export default App;
