import React from 'react';

const RecordRow = ({ record }) => {
  return (
    <tr>
      <td>{record.artist}</td>
      <td>{record.album}</td>
      <td>{record.origin}</td>
      <td>{record.og}</td>
      {record.condition !== '' ?
        <td className="negative">{record.condition}</td> : <td></td>
      }
      <td>{record.mono}</td>
      <td>{record.genre}</td>
      <td>{record.notes}</td>
    </tr>
  );
}

export default RecordRow;
