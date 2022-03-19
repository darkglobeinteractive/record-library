import React from 'react';

const FilterGenre = ({ genres, selectedGenre, setGenre }) => {

  // Generate the select options from the unique, sorted array of genres
  const genreOptions = genres.map((genre, index) => {
    return (
      <option key={index} value={genre}>{genre}</option>
    );
  });

  // onChange handler triggers the setGenre() function passed as a prop
  const handleChange = (val) => {
    setGenre('genre', val);
  }

  // Note: Use the 'value' attribute rather than selected="selected" in the options
  return (
    <div className="filter">
      <select className="ui fluid dropdown" value={selectedGenre} onChange={(e) => handleChange(e.target.value)}>
        <option value="">Genre</option>
        {genreOptions}
      </select>
    </div>
  );
}

export default FilterGenre;
