import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../AppContext";
//import Addfolder from "../../AddFolder";

export default function Sidebar() {
  return (
    <AppContext.Consumer>
      {({ folders }) => (
        <>
          <ul className='folder_list_nav'>
            {{ folders }
              ? folders.map((folder) => (
                  <li key={folder.id}>
                    <Link className='folder_nav_link' to={`/folder/${folder.id}`}>{folder.name}</Link>
                  </li>
                ))
              : null}
          </ul>

          <button>
            <Link className='add_folder_link' style={{color:'black', textDecoration:'none'}} to={"/add-folder"}>
              + folder
            </Link>
          </button>
        </>
      )}
    </AppContext.Consumer>
  );
}
