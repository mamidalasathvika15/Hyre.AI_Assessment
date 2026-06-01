import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [editingId, setEditingId] = useState(null);

const [selectedCandidate, setSelectedCandidate] =
  useState(null);
  const navigate = useNavigate();

const [searchTerm, setSearchTerm] =
  useState("");

const [message, setMessage] =
  useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    skills: "",
    experience: "",
    status: "Applied",
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await API.get("/candidates");
      setCandidates(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCandidate = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      await API.put(
        `/candidates/${editingId}`,
        formData
      );

      setMessage(
        "Candidate updated successfully ✅"
      );
    } else {
      await API.post(
        "/candidates",
        formData
      );

      setMessage(
        "Candidate added successfully ✅"
      );
    }

    setFormData({
      fullName: "",
      email: "",
      skills: "",
      experience: "",
      status: "Applied",
    });

    setEditingId(null);

    fetchCandidates();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error(error);
  }
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this candidate?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/candidates/${id}`);

    setMessage(
      "Candidate deleted successfully ❌"
    );

    fetchCandidates();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (candidate) => {
  setEditingId(candidate._id);

  setFormData({
    fullName: candidate.fullName,
    email: candidate.email,
    skills: candidate.skills,
    experience: candidate.experience,
    status: candidate.status,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const filteredCandidates =
  candidates.filter((candidate) =>
    `${candidate.fullName}
     ${candidate.email}
     ${candidate.skills}
     ${candidate.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
  <div style={styles.brandSection}>
    <div style={styles.logoBox}>
      H
    </div>

    <div>
      <h2 style={styles.brandTitle}>
        Hyre.ai
      </h2>

      <p style={styles.brandSubtitle}>
        Candidate Pipeline
      </p>
    </div>
  </div>

  <div style={styles.userSection}>
    <div>
      <p style={styles.userName}>
        Admin User
      </p>

      <p style={styles.userRole}>
        Recruitment Lead
      </p>
    </div>

    <button
  style={styles.logoutBtn}
  onClick={() => navigate("/")}
  title="Logout"
>
   ⇥
</button>
  </div>
</div>
<div style={styles.searchContainer}>
  <input
    type="text"
    placeholder="Search by name, email, skills or status..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    style={styles.searchInput}
  />
</div>
{message && (
  <div style={styles.messageBox}>
    {message}
  </div>
)}

      <div style={styles.formCard}>
       <h2>
  {editingId
    ? "Update Candidate"
    : "Add Candidate"}
</h2>

        <form
          onSubmit={handleAddCandidate}
          style={styles.form}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            style={styles.input}
            required
          />

        <select
  name="status"
  value={formData.status}
  onChange={handleChange}
  style={styles.input}
>
  <option>Applied</option>
  <option>Shortlisted</option>
  <option>Rejected</option>
</select>

<div style={styles.buttonWrapper}>
  <button
    type="submit"
    style={styles.button}
  >
    {editingId
      ? "Update Candidate"
      : "Add Candidate"}
  </button>
</div>
        </form>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Skills</th>
              <th style={styles.th}>Experience</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          
<tbody>
  {filteredCandidates.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        style={styles.emptyState}
      >
        No matching candidates found 🚀
      </td>
    </tr>
  ) : (
    filteredCandidates.map((candidate) => (
      <tr key={candidate._id}>
        <td style={styles.td}>
          {candidate.fullName}
        </td>

        <td style={styles.td}>
          {candidate.email}
        </td>

        <td style={styles.td}>
          {candidate.skills}
        </td>

        <td style={styles.td}>
          {candidate.experience} Years
        </td>

        <td style={styles.td}>
          <span
            style={{
              ...styles.status,
              backgroundColor:
                candidate.status === "Applied"
                  ? "#dbeafe"
                  : candidate.status ===
                    "Shortlisted"
                  ? "#dcfce7"
                  : "#fee2e2",
              color:
                candidate.status === "Applied"
                  ? "#1d4ed8"
                  : candidate.status ===
                    "Shortlisted"
                  ? "#15803d"
                  : "#dc2626",
            }}
          >
            {candidate.status}
          </span>
        </td>

        <td style={styles.td}>
          <div style={styles.actionButtons}>
            <button
              style={styles.viewBtn}
              onClick={() =>
                setSelectedCandidate(
                  candidate
                )
              }
            >
              View
            </button>

            <button
              style={styles.editBtn}
              onClick={() =>
                handleEdit(candidate)
              }
            >
              Edit
            </button>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                handleDelete(
                  candidate._id
                )
              }
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
      {selectedCandidate && (
  <div style={styles.modalOverlay}>
    <div style={styles.modal}>
      <h2>Candidate Details</h2>

      <div style={styles.modalContent}>
        <p>
          <strong>Name:</strong>{" "}
          {selectedCandidate.fullName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {selectedCandidate.email}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {selectedCandidate.skills}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {selectedCandidate.experience} Years
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {selectedCandidate.status}
        </p>
      </div>

      <button
        style={styles.closeBtn}
        onClick={() =>
          setSelectedCandidate(null)
        }
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px",
  },

  header: {
    marginBottom: "25px",
  },

  heading: {
    fontSize: "36px",
    color: "#111827",
  },

  subHeading: {
    color: "#6b7280",
  },

  formCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

 form: {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginTop: "25px",
  alignItems: "center",
},
buttonWrapper: {
  display: "flex",
  alignItems: "center",
  width: "100%",
},

actionButtons: {
  display: "flex",
  gap: "10px",
},
logoutBtn: {
  background: "#3a6bd4",
  color: "white",
  border: "none",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

searchContainer: {
  marginBottom: "20px",
},

searchInput: {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
},
topBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "24px",
  borderBottom: "2px solid #e5e7eb",
  marginBottom: "30px",
},

brandSection: {
  display: "flex",
  alignItems: "center",
  gap: "20px",
},

logoBox: {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  background: "#2563eb",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px",
  fontWeight: "700",
},

brandTitle: {
  margin: 0,
  fontSize: "28px",
  color: "#111827",
},

brandSubtitle: {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "4px",
},

userSection: {
  display: "flex",
  alignItems: "center",
  gap: "22px",
},

userName: {
  margin: 0,
  fontWeight: "600",
  color: "#111827",
},

userRole: {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
},

logoutBtn: {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "600",
},

messageBox: {
  background: "#dcfce7",
  color: "#15803d",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "20px",
  fontWeight: "600",
},

emptyState: {
  textAlign: "center",
  padding: "40px",
  color: "#6b7280",
},

viewBtn: {
  background: "#7c3aed",
  color: "white",
  border: "none",
  minWidth: "90px",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
},

editBtn: {
  background: "#2563eb",
  color: "white",
  border: "none",
  minWidth: "90px",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
},

deleteBtn: {
  background: "#ef4444",
  color: "white",
  border: "none",
  minWidth: "90px",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
},

modalOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

modal: {
  background: "white",
  padding: "35px",
  borderRadius: "22px",
  width: "420px",
  boxShadow:
    "0 20px 50px rgba(0,0,0,0.2)",
},

modalContent: {
  marginTop: "20px",
  lineHeight: "2",
},

closeBtn: {
  marginTop: "20px",
  background: "#111827",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
},
 deleteBtn: {
  background: "#ef4444",
  color: "white",
  border: "none",
  minWidth: "90px",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
},

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px",
  },

 button: {
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "14px",
  padding: "14px 24px",
  cursor: "pointer",
  fontWeight: "600",
  width: "100%",
  height: "54px",
},
  actionButtons: {
  display: "flex",
  gap: "10px",
},

editBtn: {
  background: "#2563eb",
  color: "white",
  border: "none",
  minWidth: "90px",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
},

  card: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    overflowX: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "24px 18px",
    borderBottom: "2px solid #e5e7eb",
  },

  td: {
    padding: " 24px 18px",
    borderBottom: "1px solid #f1f5f9",
  },

  status: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default Dashboard;