import React from 'react'
import { Routes, Route, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import TextEditor from './TextEditor'
import { v4 as uuidV4 } from "uuid"

const router = createBrowserRouter([
  {
    path:"/",
    element:(
      <Navigate to={`/documents/${uuidV4()}`}/>
    ),
  },
  {
    path:"/documents/:id",
    element:(
      <TextEditor/>
    )
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

// import TextEditor from "./TextEditor"
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom"


// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact>
//           <Redirect to={`/documents/${uuidV4()}`} />
//         </Route>
//         <Route path="/documents/:id">
//           <TextEditor />
//         </Route>
//       </Switch>
//     </Router>
//   )
// }

// export default App