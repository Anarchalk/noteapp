import React, { Component } from "react";
import AppContext from "../../AppContext";
import config from "../../config";

export default class AddNote extends Component {
  static contextType = AppContext;
  state = {
    noteName: "",
    contName: "",
    folder_id: "",
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      {
        name: this.state.noteName,
        content: this.state.contName,
        folder_id: this.state.folder_id,
        modified: new Date(),
      }
    )
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.noteName,
        content: this.state.contName,
        folder_id: this.state.folder_id,
        modified: new Date(),
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/note/${note.id}`);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "#102541",
            gridArea: "main",
            height: "calc(100vh - 120px)",
            overflow: "auto",
            color: "whitesmoke",
          }}
          className="addnote"
        >
          <h2>Create a note</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Name</label> <br />
            <input
              onChange={(e) => this.handleInputChange(e)}
              type="text"
              name="noteName"
              value={this.state.noteName}
              required
            />
            <br />
            <label>Content</label>
            <br />
            <textarea
              onChange={(e) => this.handleInputChange(e)}
              value={this.state.contName}
              name="contName"
              required
            />
            <br />
            <label>
              Folder
              <br />
              <select
                onChange={(e) => this.handleInputChange(e)}
                name="folder_id"
                value={this.state.folder_id}
              >
                <option>--</option>
                {this.context.folders.map((folder) => (
                  <option value={folder.id}>{folder.name}</option>
                ))}
              </select>
              <br />
            </label>
            <br />
            <input type="submit" value="add note" />
          </form>
        </div>
      </>
    );
  }
}
