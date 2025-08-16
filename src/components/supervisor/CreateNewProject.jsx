import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./CreateNewProject.module.css";

/** Toggle this to true if you have a shared axios instance with interceptors */
const USE_SHARED_API = false;

let api = axios;
if (USE_SHARED_API) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  api = require("../../api").default; // adjust path to your api.js
}

function CreateNewProject() {
  const [projectTitle, setProjectTitle] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [role, setRole] = useState("");
  const [coSupervisors, setCoSupervisors] = useState([]);
  const [selectedCoSupervisor, setSelectedCoSupervisor] = useState("");
  const [groupMembers, setGroupMembers] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);
  const [status, setStatus] = useState({ kind: "", text: "" }); // kind: '', 'ok', 'err', 'info'
  const [loading, setLoading] = useState(false);

  const authHeaders = useMemo(() => {
    if (USE_SHARED_API) return {}; // shared api adds token automatically
    const token = localStorage.getItem("access");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  // Load role + supervisor info + (conditionally) co-supervisors
  useEffect(() => {
    const fetchProfileAndCoSup = async () => {
      setStatus({ kind: "", text: "" });
      try {
        const roleRes = await api.get("http://127.0.0.1:8000/api/get-role/", {
          headers: authHeaders,
        });
        const { role: r, full_name, name } = roleRes.data || {};
        setRole(r || "");
        setSupervisorName(full_name || name || "Unknown Supervisor");

        if (r === "supervisor") {
          const csRes = await api.get(
            "http://127.0.0.1:8000/api/co-supervisors/",
            { headers: authHeaders }
          );
          const list = (csRes.data || []).filter((u) =>
            (u.email || "").includes("@supervisor.uol.edu.pk")
          );
          setCoSupervisors(list);
        } else {
          setCoSupervisors([]);
        }
      } catch (err) {
        console.error("Profile/co-supervisors load failed:", err);
        // Don’t spam errors if not logged-in; front-end routing should handle auth anyway
        setStatus({
          kind: "info",
          text:
            "Profile not available. Make sure you are logged in as a supervisor to assign a co-supervisor.",
        });
      }
    };
    fetchProfileAndCoSup();
  }, [authHeaders]);

  const handleGroupChange = (index, value) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const validatePreview = () => {
    if (!projectTitle.trim()) return "Project title is required.";
    // group members are optional; you can enforce at least one if needed:
    // if (!groupMembers.some((g) => g.trim())) return "At least one group member SAP ID is required.";
    return null;
  };

  const handlePreview = async () => {
    const err = validatePreview();
    if (err) {
      setStatus({ kind: "err", text: err });
      return;
    }

    setStatus({ kind: "", text: "" });
    setLoading(true);
    try {
      // fetch member details for non-empty SAPs
      const lookups = groupMembers
        .map((sap) => (sap || "").trim())
        .filter(Boolean)
        .map((sap) =>
          api.get(`http://127.0.0.1:8000/api/student-info/${sap}`, {
            headers: authHeaders,
          })
        );
      const results = await Promise.all(lookups);
      setGroupDetails(results.map((r) => r.data));
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setStatus({
        kind: "err",
        text: "Failed to fetch student details. Please check SAP IDs.",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateFinal = () => {
    if (role && role !== "supervisor") {
      // backend CreateProjectView expects the authenticated user to be a supervisor
      return "Only supervisors can create projects.";
    }
    if (!projectTitle.trim()) return "Project title is required.";
    return null;
  };

  const handleFinalSubmit = async () => {
    const err = validateFinal();
    if (err) {
      setStatus({ kind: "err", text: err });
      return;
    }

    setLoading(true);
    setStatus({ kind: "", text: "" });
    try {
      await api.post(
        "http://127.0.0.1:8000/api/create-project/",
        {
          project_title: projectTitle.trim(),
          co_supervisor_email: selectedCoSupervisor || "",
          group_member_1: groupDetails[0]?.id || null,
          group_member_2: groupDetails[1]?.id || null,
          group_member_3: groupDetails[2]?.id || null,
        },
        { headers: authHeaders }
      );

      setStatus({ kind: "ok", text: "🎉 Project successfully created!" });
      // reset form
      setSubmitted(false);
      setGroupDetails([]);
      setProjectTitle("");
      setSelectedCoSupervisor("");
      setGroupMembers(["", "", ""]);
    } catch (error) {
      console.error("Project creation failed:", error.response?.data || error.message);
      setStatus({
        kind: "err",
        text:
          error.response?.data?.detail ||
          error.response?.data?.error ||
          "Project creation failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Project</h2>

      {!submitted ? (
        <div className={styles.card}>
          <div className={styles.formGrid}>
            {/* Full width: Title */}
            <div className={`${styles.inputGroup} ${styles.full}`}>
              <label>Project Title:</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
                placeholder="Enter project title"
              />
            </div>

            {/* Full width: Supervisor */}
            <div className={`${styles.inputGroup} ${styles.full}`}>
              <label>Supervisor:</label>
              <input type="text" value={supervisorName} readOnly />
            </div>

            {/* Full width: Co-Supervisor (only useful for supervisors) */}
            <div className={`${styles.inputGroup} ${styles.full}`}>
              <label>Co-Supervisor:</label>
              <select
                value={selectedCoSupervisor}
                onChange={(e) => setSelectedCoSupervisor(e.target.value)}
                disabled={role !== "supervisor"}
              >
                <option value="">Select Co-Supervisor</option>
                {coSupervisors.map((cs) => (
                  <option key={cs.id} value={cs.email}>
                    {cs.full_name || cs.email.split("@")[0]} ({cs.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Group Members (flow 2-column on desktop) */}
            {groupMembers.map((member, index) => (
              <div key={index} className={styles.inputGroup}>
                <label>Group Member {index + 1} (SAP ID):</label>
                <input
                  placeholder="Enter SAP ID"
                  value={member}
                  onChange={(e) => handleGroupChange(index, e.target.value)}
                />
              </div>
            ))}

            {/* Button row (full width) */}
            <div className={styles.full}>
              <button
                className={styles.previewBtn}
                onClick={handlePreview}
                disabled={loading}
              >
                {loading ? "Please wait…" : "Submit"}
              </button>
            </div>

            {!!status.text && (
              <div
                className={`${styles.full}`}
                style={{
                  color:
                    status.kind === "err"
                      ? "#cf1322"
                      : status.kind === "ok"
                      ? "#389e0d"
                      : "#555",
                }}
              >
                {status.text}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.summary}>
          <h3>Project Summary</h3>
          <p>
            <strong>Title:</strong> {projectTitle || "—"}
          </p>
          <p>
            <strong>Supervisor:</strong> {supervisorName || "—"}
          </p>
          <p>
            <strong>Co-Supervisor:</strong> {selectedCoSupervisor || "—"}
          </p>

          <h4>Group Members</h4>
          {groupDetails?.length ? (
            groupDetails.map((m, i) => (
              <div key={i} className={styles.memberCard}>
                <p>
                  <strong>Group {i + 1}:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Name:</strong> {m.full_name || "—"}
                  </li>
                  <li>
                    <strong>SAP ID:</strong> {m.registration_id || "—"}
                  </li>
                  <li>
                    <strong>Email:</strong> {m.email || "—"}
                  </li>
                  <li>
                    <strong>Program:</strong> {m.program || "—"}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No group members resolved.</p>
          )}

          <button
            className={styles.submitBtn}
            onClick={handleFinalSubmit}
            disabled={loading}
          >
            {loading ? "Creating…" : "Create Project"}
          </button>

          {!!status.text && (
            <div
              style={{
                marginTop: 10,
                color:
                  status.kind === "err"
                    ? "#cf1322"
                    : status.kind === "ok"
                    ? "#389e0d"
                    : "#555",
              }}
            >
              {status.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateNewProject;
