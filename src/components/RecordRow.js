import React from 'react';

const RecordRow = ({ record }) => {
  return (
    <tr>
      <td>{record.artist}</td>
      <td>{record.album}</td>
      <td>{record.origin}</td>
      <td>{record.og}</td>
      <td>{record.condition}</td>
      <td>{record.mono}</td>
      <td>{record.genre}</td>
      <td>{record.notes}</td>
    </tr>
  );
}

export default RecordRow;
