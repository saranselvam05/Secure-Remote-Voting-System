import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import "./adminPage.css"

function AdminPage() {

    const [results, setResults] = useState([])
    const [candidates, setCandidates] = useState([])
    const [editId, setEditId] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [party, setParty] = useState("")
    const [constituency, setConstituency] = useState("")

    // ---------------- RESULTS ----------------

    const fetchResults = async () => {

        try {

            const res = await fetch("http://127.0.0.1:5000/results")
            const data = await res.json()

            setResults(data)

            toast.success("Results Loaded")

        }
        catch (error) {

            toast.error("Unable to load results")

        }

    }

    // ---------------- GET CANDIDATES ----------------

    const fetchCandidates = async () => {

        const res = await fetch("http://127.0.0.1:5000/admin/candidates")
        const data = await res.json()

        setCandidates(data)
    }

    useEffect(() => {
        fetchCandidates()
    }, [])

    // ---------------- ADD CANDIDATE ----------------

    const addCandidate = async () => {

        const res = await fetch("http://127.0.0.1:5000/admin/add_candidate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                party: party,
                constituency: constituency
            })

        })


        if (res.ok) {

            toast.success("Candidate Added Successfully")

        }
        else {

            toast.error("Failed to Add Candidate")

        }


        fetchCandidates()

        setName("")
        setParty("")
        setConstituency("")

    }
    const updateCandidate = async () => {


        const res = await fetch(`http://127.0.0.1:5000/admin/update_candidate/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,
                party: party,
                constituency: constituency

            })

        })


        if (res.ok) {

            toast.success("Candidate Updated Successfully")

        }
        else {

            toast.error("Update Failed")

        }


        fetchCandidates()


        setName("")
        setParty("")
        setConstituency("")

        setIsEditing(false)

    }
    // ---------------- DELETE CANDIDATE ----------------

    const deleteCandidate = async (id) => {


        const res = await fetch(`http://127.0.0.1:5000/admin/delete_candidate/${id}`, {

            method: "DELETE"

        })


        if (res.ok) {

            toast.success("Candidate Deleted")

        }
        else {

            toast.error("Delete Failed")

        }


        fetchCandidates()

    }

    return (
        <div className="admin-container">

            <h1 className="heading">Admin Dashboard</h1>

            {/* ADD CANDIDATE FORM */}

            <div className="add-box">

                <h2>Add Candidate</h2>

                <input
                    placeholder="Candidate Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Party"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                />

                <input
                    placeholder="Constituency"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                />

                {isEditing ? (

                    <button onClick={updateCandidate}>
                        Update Candidate
                    </button>

                ) : (

                    <button onClick={addCandidate}>
                        Add Candidate
                    </button>

                )}

            </div>

            {/* CANDIDATE LIST */}

            <h2>Candidate List</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Party</th>
                        <th>Constituency</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {candidates.map((c) => (
                        <tr key={c.id}>

                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.party}</td>
                            <td>{c.constituency}</td>

                            <td>
                                <button onClick={() => editCandidate(c)}>
                                    Edit</button>

                                <button onClick={() => deleteCandidate(c.id)}>
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

            {/* RESULTS */}

            <button className="result-btn" onClick={fetchResults}>
                View Results
            </button>

            <div className="result-box">
                {results.map((item, index) => (
                    <div key={index} className="candidate-card">
                        <h3>{item.candidate}</h3>
                        <p>Votes : {item.votes}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AdminPage