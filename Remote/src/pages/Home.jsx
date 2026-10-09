import { useNavigate } from "react-router-dom"
import "./home.css"

function Home() {

    const navigate = useNavigate()

    return (

        <div className="home-container">

            <h1 className="home-title">
                Welcome to Remote Voting System
            </h1>
            

            <p className="home-subtitle">
                Securely cast your vote from anywhere using voter ID verification
                and secure authentication.
            </p>

            <button
                className="vote-btn"
                onClick={() => navigate("/Userenter")}
            >
                Vote Now
            </button>
            

            <div className="features">

                <div className="feature-card">
                    <h3>🔒 Secure Voting</h3>
                    <p>
                        Voter ID and OTP verification ensure secure voting.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>🌍 Remote Access</h3>
                    <p>
                        Vote from anywhere without visiting your hometown booth.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>⚡ Fast Results</h3>
                    <p>
                        Votes are counted instantly and results appear immediately.
                    </p>
                </div>

            </div>

        </div>

    )

}

export default Home;