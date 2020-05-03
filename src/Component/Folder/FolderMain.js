import React, { Component } from "react";
import {Link } from "react-router-dom";
import AppContext from "../../AppContext";
import Note from '../Note/Note'
import './FolderMain.css'

export default class FolderMain extends Component {
  static contextType = AppContext;

  onDelete = () => {
    this.props.history.push("/");
  }

  render() {
    const folderId = this.props.match.params.folderId;

    const notes = this.context.notes.filter((note) => {
      return note.folder_id === folderId
    });
    return (
      <>
        <div className="FolderMain">
        <button>
          <Link to={"/add-note"} style={{color:'black'}}>Add note</Link>
        </button>
          <ul>
            {notes
              ? notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    modified={note.modified}
                    name={note.name}
                    onDelete={this.onDelete}
                  />
                ))
              : null}
          </ul>
        </div>
      </>
    );
  }
}