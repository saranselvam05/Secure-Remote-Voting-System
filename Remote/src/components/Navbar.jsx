import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar() {

    return (

        <nav className="navbar">

            <h2 className="logo">Remote Voting</h2>

            <div className="nav-links">

                <Link to="/">Home</Link>
                <Link to="/adminlogin">Admin</Link>
                <Link to="/about">About</Link>
                <Link to="/signup">Signup</Link>

            </div>

        </nav>

    )

}

export default Navbar;