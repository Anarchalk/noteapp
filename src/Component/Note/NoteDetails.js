import React, { Component } from "react";
import AppContext from "../../AppContext";
import Note from "./Note"

export default class NoteDetails extends Component {
  static contextType = AppContext;

  onDelete = () => {
    this.props.history.push("/");
  }

  render() {
    const id = this.props.match.params.noteId;
    const note = this.context.notes.find((note) => {
      return note.id === parseInt(id) 
    });

    return (
      <>
        <div className="note-details" >
            <h1>Note Details</h1>
            { note &&
                <Note 
                    name={note.name}
                    modified={note.modified}
                    content={note.content}
                    id={note.id}
                    onDelete={this.onDelete}
                />
            }
        </div>
      </>
    );
  }
}