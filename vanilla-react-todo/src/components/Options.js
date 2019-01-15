import React, { Fragment } from 'react';
import './Options.css';

const Options = ({ edit, del, reset, toggleProp, id, content, editMode }) => (
  <div className="Options">
    {editMode ? (
      <Fragment>
        <i onClick={() => edit(id, content)} className="far fa-save" />
        <i
          onClick={() => {
            reset();
            toggleProp('editMode', id);
          }}
          className="fas fa-ban"
        />
      </Fragment>
    ) : (
      <Fragment>
        <i onClick={() => toggleProp('editMode', id)} className="fas fa-edit" />
        <i onClick={() => del(id)} className="fas fa-trash" />
      </Fragment>
    )}
  </div>
);

export default Options;
