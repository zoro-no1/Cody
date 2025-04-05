
import {useEffect} from "react"
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NoPage from "./pages/NoPage"
import {authStore} from "./store/authStore.js"
import Signin from "./pages/Signin.jsx"
import Navbar from "./components/NavBar.jsx"
import ExistingProject from "./pages/ExistingProject.jsx"
import NewProject from "./pages/NewProject.jsx"
import CodingPage from "./pages/CodingPage.jsx"
import LogoutPage from "./pages/LogoutPage.jsx"
function App() {

  const {checkAuth,authUser}=authStore()
 useEffect(() => {
 
   checkAuth()
 }, [checkAuth])
 

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/auth" element={!authUser?<Signin/>:<Navigate to="/"/>}/>
      <Route path="/projects" element={authUser?<ExistingProject/>:<Navigate to="/auth"/>}/>
      <Route path="/NewProject" element={authUser?<NewProject/>:<Navigate to="/auth"/>}/>
      <Route path="/coding" element={authUser?<CodingPage/>:<Navigate to="/auth"/>}/>
      <Route path="/logout" element={authUser?<LogoutPage/>:<Navigate to="/auth"/>}/>
      <Route path='/*' element={<NoPage/>}/>
    </Routes>
     
    </>
  )
}

export default App
