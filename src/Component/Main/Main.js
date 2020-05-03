import React from "react";
import "./Main.css";
import AppContext from "../../AppContext";
import config from "../../config";
import { Link } from "react-router-dom";
import Note from '../Note/Note'
// import { findByLabelText } from "@testing-library/react";

export default class Main extends React.Component {
  static contextType = AppContext;

  //keeping the front and back end in sync
  handleDelete = (noteId) => {
    //deleting from the backend
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      this.context.handleDelete(noteId);
    });
  };

  onDelete = () => {
    this.props.history.push("/");
  }
  render() {
    return (
      <>
        <div>
        <button>
          <Link style={{ textDecoration: "none", color:'black' }} to={"/add-note"}>
            Add note
          </Link>
        </button>
          <div
            className="main-notebox">
            <ul>
              {this.context.notes
                ? this.context.notes.map((note) => (
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
        </div>
      </>
    );
  }
}