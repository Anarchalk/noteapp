import React, { Component } from "react";
import AppContext from "../../AppContext";
import { NavLink } from 'react-router-dom';
import config from "../../config";

export default class Note extends Component {
  static contextType = AppContext;

  handleNote = (noteId) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      this.context.handleDelete(noteId);
      //this.props.history.push("/");
    });
  };

  render() {
    const {modified, name, id, content} = this.props
    //const noteId = this.props.match.params.noteId;
     //const note = this.context.notes.filter((note) => note.id === parseInt(noteId));
   
    return (
      <>
        <div
          className="note"
          // style={{
          //   backgroundColor: '#102541',
          //   gridArea: 'main',
          //   height: 'calc(100vh - 120px)',
          //   overflow: 'auto',
          //   color:'whitesmoke'
          // }}
        >
            { !content ?
              <NavLink className='notelink' notelink to={`/note/${id}`}>{name}</NavLink>
              :
              <NavLink to={`#`}>{name}</NavLink>
            }
            
            <p>{modified}</p>
            {content &&
              <p>{content}</p>
            }
             <button onClick={() => this.handleNote(id)}>Main remove</button>
          {/* <ul>
            {notes
              ? notes.map((note) => (
                  <li key={note.id}>
                    {note.name}
                    <p>{note.modified}</p>
                    <p>{note.content}</p>
                  </li>
                ))
              : null}

            <button onClick={() => this.handleNote(noteId)}>remove</button>
          </ul> */}
        </div>
      </>
    );
  }
}

