  
import React, { Component } from "react";
import AppContext from "../../AppContext";
import './notesidebar.css'

export default class NoteSidebar extends Component {
  static contextType = AppContext;

  handleClick = (folderId) => {
    this.props.history.push(`/folder/${folderId}`);
  };

  render() {
    const { noteId } = this.props.match.params;
    const note = this.context.notes.find((note) => {
      return note.id === parseInt(noteId)
    });
    const folder = note
      ? this.context.folders.find((folder) => {
        return folder.id === note.folder_id
      })
      : null;

    return (
      <>
        <div className = "NoteSidebar">
          {folder && <h2>{folder.name}</h2>}
          <button className='NoteSidebar_backbutton' onClick={() => this.handleClick(folder.id)} type="submit">
            back
          </button>
        </div>{" "}
      </>
    );
  }
}