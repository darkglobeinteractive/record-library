import React from 'react';

// Generate the individual record rows
const RecordRow = ({ record, setArtist }) => {

  const handleArtistClick = (e, artist) => {
    e.preventDefault();
    setArtist('artist', artist);
  }

  return (
    <tr className={record.visibility}>
      <td><a href="#" onClick={(e) => handleArtistClick(e, record.artist)}>{record.artist}</a></td>
      <td>{record.album}</td>
      <td>{record.origin}</td>
      {record.og !== '' ?
        <td>{record.og}</td> : <td className="empty"></td>
      }
      {record.condition !== '' ?
        <td className="negative">{record.condition}</td> : <td className="empty"></td>
      }
      <td>{record.mono}</td>
      <td className="genre">{record.genre}</td>
      <td className="no-mobile">{record.notes}</td>
    </tr>
  );
}

export default RecordRow;
