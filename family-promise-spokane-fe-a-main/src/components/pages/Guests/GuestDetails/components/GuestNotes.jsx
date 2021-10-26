import React from 'react';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const GuestNotes = ({ memberInfo }) => {
  const [noteValue, setNoteValue] = React.useState('');
  const [notes, setNotes] = React.useState([]);

  const handleChange = e => {
    setNoteValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setNotes([...notes, noteValue]);
  };

  return (
    <div className="container-note">
      <div className="notes-container" onClick={e => e.stopPropagation()}>
        <div className="close-notes"></div>
        <div className="notes-container-inner">
          <div className="notes">
            {notes.map(note => {
              return <h4 className="note">{note}</h4>;
            })}
          </div>
        </div>
        <div className="add-note-form-container">
          <form action="" className="add-note-form" onSubmit={handleSubmit}>
            <TextField
              value={noteValue}
              style={{ width: '100%' }}
              onChange={handleChange}
              multiline
              rows={4}
              label="Type anything you want here"
            >
              Add notes
            </TextField>
            <div onClick={handleSubmit}>
              <IconButton size="medium">
                <AddIcon />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestNotes;
