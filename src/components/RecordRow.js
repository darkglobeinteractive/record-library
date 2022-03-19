import React from 'react';

// Generate the individual record rows
const RecordRow = ({ record }) => {
  return (
    <tr className={record.visibility}>
      <td>{record.artist}</td>
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
