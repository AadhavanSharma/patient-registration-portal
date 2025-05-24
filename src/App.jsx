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
        <Route path = "/dashboard" element = {<Suspense fallback={"Loading . . ."}><Dashboard></Dashboard></Suspense>}></Route>
        <Route path = "/yellow" element = {<Suspense fallback={"Loading . . ."}><Query/></Suspense>}></Route>
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
          }}>Home</button>

          <button onClick = {()=>{
            navigate("/dashboard");
          }}>Registered Users</button>

          <button onClick = {()=>{
            navigate("/yellow");
          }}>Query</button>

        </div>
      </div>
    </div>
  )
}

export default App 
