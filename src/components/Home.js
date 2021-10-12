import React from 'react'
// import Notestate from "../context/notes/Notecontext\
import Notes from "./Notes"


function Home(props) {
   const {showAlert}=props;
    return (
        <div>
            <Notes showAlert={showAlert}/>
        </div>
    )
}

export default Home
