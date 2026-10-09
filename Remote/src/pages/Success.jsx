import { useNavigate } from "react-router-dom"
import "./success.css"

function Success() {

    const navigate = useNavigate()

    return (

        <div className="success-container">

            <div className="success-box">

                <div className="check-icon">✓</div>

                <h1>Vote Submitted</h1>

                <p>Your vote has been recorded successfully.</p>

                <button 
                className="home-btn"
                onClick={() => navigate("/")}>
                    Logout
                </button>

            </div>

        </div>

    )

}

export default Success