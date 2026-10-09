import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Adminlogin.css"
import toast from "react-hot-toast"

function AdminLogin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const login = () => {

        axios.post("http://localhost:5000/admin/login", {
            username: username,
            password: password
        })
            .then(res => {

                if (res.data.status === "success") {

                    toast.success("Login Successful")

                    localStorage.setItem("admin", "true")

                    setTimeout(() => {
                        navigate("/admin")
                    }, 1000)

                } else {
                    toast.error("Invalid Username or Password")
                }

            })

    }

    return (

        <div className="admin-container1">

            <div className="admin-card">

                <h2 className="admin-title">Admin Login</h2>

                <p className="admin-subtitle">Secure Remote Voting System</p>

                <input
                    className="admin-input"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className="admin-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="admin-btn" onClick={login}>
                    Login
                </button>

            </div>

        </div>

    )

}

export default AdminLogin