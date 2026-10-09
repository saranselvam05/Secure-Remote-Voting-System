import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./vote.css"
import toast from "react-hot-toast";

function Vote() {

    const [candidates, setCandidates] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const voter = localStorage.getItem("voter")

        axios.get("http://localhost:5000/candidates/" + voter)
            .then(res => setCandidates(res.data))

    }, [])

    useEffect(() => {

        const voter = localStorage.getItem("voter")

        console.log("Voter ID:", voter)

        axios.get("http://localhost:5000/candidates/" + voter)
            .then(res => {

                console.log("Candidates Data:", res.data)

                setCandidates(res.data)

            })

    }, [])

    const vote = (id) => {

        const voter = localStorage.getItem("voter")

        axios.post("http://localhost:5000/vote", {
            voter_id: voter,
            candidate_id: id
        })
            .then(() => navigate("/success"))

    }

    return (

        <div className="vote-container">

            <h1 className="vote-title">Select Your Candidate</h1>

            <div className="candidate-grid">

                {candidates.map(c => (

                    <div className="candidate-card" key={c.id}>

                        <h2>{c.name}</h2>

                        <p className="party">{c.party}</p>

                        <button
                            className="vote-btn"
                            onClick={() => vote(c.id)}>
                            Vote
                        </button>

                    </div>

                ))}

            </div>

        </div>

    )

}

export default Vote