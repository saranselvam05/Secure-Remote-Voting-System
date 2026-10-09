import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./signup.css"
import toast from "react-hot-toast"

function Signup() {

    const navigate = useNavigate()

    const [voterId, setVoterId] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [constituency, setConstituency] = useState("")
    const [phoneno, setPhoneno] = useState("")

    const signup = () => {

        axios.post("http://localhost:5000/signup", {

            voter_id: voterId,
            name: name,
            age: age,
            constituency: constituency,
            phone_number: phoneno

        })
            .then((res) => {


                if (res.data.status === "success") {

                    toast.success("Registration Successful")


                    setTimeout(() => {

                        navigate("/")

                    }, 1000)

                }
                else {

    toast.error(
        res.data.message || "Registration Failed"
    )

}


            })
            .catch(() => {

                toast.error("Registration Failed")

            })

    }

    return (

        <div className="signup-container">

            <div className="signup-card">

                <h1 className="signup-title">Create Voter Account</h1>

                <p className="signup-subtitle">
                    Register to securely participate in the Remote Voting System
                </p>

                <div className="input-group">
                    <input
                        className="signup-input"
                        placeholder="Voter ID"
                        onChange={(e) => setVoterId(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="signup-input"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="signup-input"
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="signup-input"
                        placeholder="Constituency"
                        onChange={(e) => setConstituency(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="signup-input"
                        placeholder="Phone_no"
                        type="tel"
                        onChange={(e) => setPhoneno(e.target.value)}
                    />
                </div>

                <button className="signup-btn" onClick={signup}>
                    Register Now
                </button>

            </div>

        </div>

    )
}

export default Signup