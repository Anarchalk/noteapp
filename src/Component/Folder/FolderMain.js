import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
import './FolderMain.css'
import Note from '../Note/Note'

export default class FolderMain extends Component {
  static contextType = AppContext;

  render() {
   // const noteId = this.props.match.params.noteId;
    const folder_id = this.props.match.params.folderId;
    // console.log(folderId)
    const notes = this.context.notes.filter(
      (note) => note.folder_id === folder_id
    );
    return (
      <>
        <div className="FolderMain">
        <ul>
            {notes
              ? notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    modified={note.modified}
                    name={note.name}
                  />
                ))
              : null}
          </ul>
        </div>
        <button >
          <Link to={"/add-note"}>Add note</Link>
        </button>
      </>
    );
  }
}
