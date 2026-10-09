import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import UserEnter from "./pages/UserEnter"
import Vote from "./pages/Vote"
import Success from "./pages/Success"
import Admin from "./pages/AdminPage"
import Signup from "./pages/Signup"
import AdminLogin from "./pages/Adminlogin"
import { Toaster } from "react-hot-toast"

function App() {

    return (

        <BrowserRouter>
            <Navbar />
            <Toaster/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/Userenter" element={<UserEnter />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/success" element={<Success />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/adminlogin" element={<AdminLogin/>}/>

            </Routes>

        </BrowserRouter>

    )

}

export default App