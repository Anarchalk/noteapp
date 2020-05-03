import React, { Component } from "react";
import AppContext from "../../AppContext";
import { NavLink } from "react-router-dom";
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
      this.props.onDelete()
    });
  };

  render() {
    const {modified, name, id, content} = this.props
    return (
      <>
        <div className="note">
            { !content ?
              <NavLink to={`/note/${id}`}>{name}</NavLink>
              :
              <h3>{name}</h3>
            }
            
            <p>{modified}</p>
            {content &&
              <p>{content}</p>
            }
            <button
              style={{ fontSize: "10px",marginBottom:'10px' }}
              onClick={() => this.handleNote(id)}
            >
              Remove
            </button>
        </div>
      </>
    );
  }
}