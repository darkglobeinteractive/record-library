import React from 'react';

const FilterGenre = ({ genres, selectedGenre, setGenre }) => {
  const genreOptions = genres.map((genre, index) => {
    return (
      <option key={index} value={genre}>{genre}</option>
    );
  });
  const handleChange = (val) => {
    setGenre('genre', val);
  }
  return (
    <select className="ui fluid dropdown" value={selectedGenre} onChange={(e) => handleChange(e.target.value)}>
      <option value="">Genre</option>
      {genreOptions}
    </select>
  );
}

export default FilterGenre;
