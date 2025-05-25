import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import {lazy, Suspense} from 'react'
import './App.css'
const Dashboard = lazy(() => import('./components/Dashboard'));
const Landing = lazy(() => import('./components/Landing'));
const Query = lazy(() => import('./components/Query'));


function App() {

  return (
    <BrowserRouter>
    <Appbar/>
      <Routes>
        <Route path = "/" element = {<Landing></Landing>}></Route>
        <Route path = "/registeredUsers" element = {<Suspense fallback={"Loading . . ."}><Dashboard></Dashboard></Suspense>}></Route>
        <Route path = "/sqlQuery" element = {<Suspense fallback={"Loading . . ."}><Query/></Suspense>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

function Appbar(){
  const navigate = useNavigate();
  return (
    <div>
      <div id='Appbar' className = "grid grid-cols-10">

        <div id = "heading" className="col-span-7">
          <p id = "symbol">MedBlocks!</p> <p>UI to Register Patients and Access Database ⚕️</p>
        </div>

        <div className="col-span-3 buts"
        // style = {{display:"flex", justifyContent:"space-evenly",alignItems:"center", width : "500px"}}
        >

          <button onClick = {()=>{
            navigate("/");
          }}>Register New User</button>

          <button onClick = {()=>{
            navigate("/registeredUsers");
          }}>Registered Users</button>

          <button onClick = {()=>{
            navigate("/sqlQuery");
          }}>Query</button>

        </div>
      </div>
    </div>
  )
}

export default App 
