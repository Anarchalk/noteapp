import React from "react";
import "./Main.css";
import AppContext from "../../AppContext";
import config from "../../config";
import Note from '../Note/Note';
import { Link } from "react-router-dom";
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

  render() {
    return (
      <>
        <div
          className="conTainer"
          >
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
                  />
             
                    // <li
                    //   className="main-note-list"
                    //   key={note.id}
                    //   style={{ fontSize: "14px", listStyle: "none" }}
                    // >
                    //   <NavLink className='notelink'to={`/note/${note.id}`}>{note.name}</NavLink>
                    //   <p>{note.modified}</p>
                    //   <button
                    //     style={{ fontSize: "10px" }}
                    //     onClick={() => this.handleDelete(note.id)}
                    //   >
                    //     remove
                    //   </button>
                    // </li> */}
                  ))
                : null}
            </ul>
          </div>
        </div>
        <button>
          <Link style={{ textDecoration: "none" }} to={"/add-note"}>
            Add note
          </Link>
        </button>
      </>
    );
  }
}
