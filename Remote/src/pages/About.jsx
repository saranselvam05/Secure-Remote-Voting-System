import Navbar from "../components/Navbar"
import "./About.css"

function About() {
  return (
    <div>
      <Navbar />

      <div className="about-container">
        <div className="about-content">
          <h1>About Remote Voting System</h1>

          <p>
            This project is developed using Full Stack Web Development.
            It allows voters to vote from any location using secure
            authentication such as Voter ID and fingerprint verification.
          </p>

          {/* FEATURES LIST */}
          <ul className="about-list">
            <li>Secure OTP & biometric authentication</li>
            <li>Prevents duplicate voting</li>
            <li>Accessible from any location</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About;