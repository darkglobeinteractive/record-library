import React from 'react';

const FilterArtist = ({ artists, selectedArtist, setArtist }) => {

  // Generate the select options from the unique, sorted array of artists
  const artistOptions = artists.map((artist, index) => {
    return (
      <option key={index} value={artist}>{artist}</option>
    );
  });

  // onChange handler triggers the setArtist() function passed as a prop
  const handleChange = (val) => {
    setArtist('artist', val);
  }

  // Note: Use the 'value' attribute rather than selected="selected" in the options
  return (
    <div className="filter">
      <select className="ui fluid dropdown" value={selectedArtist} onChange={(e) => handleChange(e.target.value)}>
        <option value="">Artist</option>
        {artistOptions}
      </select>
    </div>
  );
}

export default FilterArtist;
