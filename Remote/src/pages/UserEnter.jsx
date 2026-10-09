import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UserEnter.css"
import toast from "react-hot-toast";

function UserEnter() {

    const [voterId, setVoterId] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [showOtp, setShowOtp] = useState(false)

    const navigate = useNavigate()

    // SEND OTP
    const sendOtp = () => {

        axios.post("http://localhost:5000/send_otp", {

            voter_id: voterId,
            phone_number: phone

        })
            .then(res => {


                if (res.data.status === "success") {


                    toast.success(
                        "Your OTP : " + res.data.otp
                    )


                    setShowOtp(true)


                }

                else {

                    toast.error(res.data.message)

                }


            })
    }

    // VERIFY OTP
    const verifyOtp = () => {

        axios.post("http://localhost:5000/verify_otp", {
            voter_id: voterId,
            otp: otp
        })
            .then(res => {

                if (res.data.status === "success") {


                    toast.success("OTP Verified")


                    localStorage.setItem("voter", voterId)


                    setTimeout(() => {

                        navigate("/vote")

                    }, 1000)



                } else {


                    toast.error("Invalid OTP")


                }

            })
    }

    return (

        <div className="login-container">

            <div className="login-box">

                <h1 className="title">Remote Voting System</h1>

                <p className="subtitle">Secure Digital Voting</p>

                <input
                    className="login-input"
                    placeholder="Enter Voter ID"
                    onChange={(e) => setVoterId(e.target.value)}
                />

                <input
                    className="login-input"
                    placeholder="Enter Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                />

                {showOtp && (

                    <input
                        className="login-input"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                    />

                )}

                {!showOtp ? (

                    <button className="login-btn" onClick={sendOtp}>
                        Send OTP
                    </button>

                ) : (

                    <button className="login-btn" onClick={verifyOtp}>
                        Verify OTP
                    </button>

                )}

            </div>

        </div>

    )

}

export default UserEnter;