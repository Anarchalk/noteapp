import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Component/Main/Main";
import Header from "./Component/Header";
import FolderMain from "./Component/Folder/FolderMain";
import Sidebar from "./Component/Main/Sidebar";
import NoteSidebar from "./Component/Note/NoteSidebar";
import config from "./config.js";
import AppContext from "./AppContext";
import AddFolder from "./Component/Add/AddFolder";
import backButton from "./backButton";
import AddNote from "./Component/Add/AddNote";
import NoteDetails from "./Component/Note/NoteDetails"
import './App.css'

export default class App extends Component {
  static contextType = AppContext;

  state = {
    folders: [],
    notes: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));
        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.log({ error })
      });
  }

  //deleting from the client side
  handleDelete = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  render() {
    console.log(this.context);
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      handleDelete: this.handleDelete,
      addFolder: this.addFolder,
      addNote: this.addNote,
    };

    return (
      <AppContext.Provider value={value}>
      <>
        <div className="App">
          <header className="App__header">
            <Switch>
              <Route path="/" component={Header} />
            </Switch>
          </header>
          <nav className="App__nav">
            <Switch>
              <Route
                exact
                path="/"
                component={Sidebar}
              />
            </Switch>
            <Route path="/folder/:folderId" component={Sidebar} />
            <Route exact path="/note/:noteId" component={NoteSidebar} />
            <Route exact path="/add-note" component={backButton} />
            <Route exact path="/add-folder" component={backButton} />
          </nav>
          <main className="App__main">
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
            
            <Route exact path="/folder/:folderId" component={FolderMain} />
            
            <Route exact path="/note/:noteId" component={NoteDetails} />
            
            <Route exact path="/add-folder" component={AddFolder} />
            
            <Route exact path="/add-note" component={AddNote} />
          </main>
        </div>
      </>
    </AppContext.Provider>
    );
  }
}
