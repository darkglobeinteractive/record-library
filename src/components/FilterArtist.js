import React from 'react';

const FilterArtist = ({ artists, selectedArtist, setArtist }) => {
  const artistOptions = artists.map((artist, index) => {
    return (
      <option key={index} value={artist}>{artist}</option>
    );
  });
  const handleChange = (val) => {
    setArtist('artist', val);
  }
  return (
    <select className="ui fluid dropdown" value={selectedArtist} onChange={(e) => handleChange(e.target.value)}>
      <option value="">Artist</option>
      {artistOptions}
    </select>
  );
}

export default FilterArtist;
