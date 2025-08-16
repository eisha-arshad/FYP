
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./AllProjects.module.css";

function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [assigningId, setAssigningId] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState("");

  const [status, setStatus] = useState("");
  const [toast, setToast] = useState({ show: false, type: "info", text: "" });

  const showToast = (text, type = "info", timeout = 2500) => {
    setToast({ show: true, type, text });
    window.setTimeout(() => setToast({ show: false, type: "info", text: "" }), timeout);
  };

  // Create API instance with token handling
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000",
    });

    // Request interceptor — attach access token
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor — refresh token if expired
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // prevent infinite loop
          const refresh = localStorage.getItem("refresh");

          if (refresh) {
            try {
              const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                refresh,
              });
              localStorage.setItem("access", res.data.access);
              originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
              return instance(originalRequest); // retry
            } catch (err) {
              console.error("Token refresh failed", err);
              showToast("Session expired. Please log in again.", "error");
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  const loadData = async () => {
    setLoading(true);
    setStatus("");
    try {
      const [projRes, supRes] = await Promise.all([
        api.get("/api/all-projects/"),
        api.get("/api/supervisors/"),
      ]);
      setProjects(projRes.data || []);
      setSupervisors((supRes.data || []).filter((s) => s.role === "supervisor"));
    } catch (e) {
      setStatus("Failed to load projects or supervisors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAssign = (projectId) => {
    setAssigningId(projectId);
    setSelectedEvaluator("");
    setStatus("");
  };

  const closeAssign = () => {
    setAssigningId(null);
    setSelectedEvaluator("");
  };

  const handleAssign = async () => {
    if (!assigningId || !selectedEvaluator) return;
    try {
      setStatus("Assigning...");
      await api.post("/api/assign-evaluation/", {
        project_id: assigningId,
        evaluator_id: Number(selectedEvaluator),
      });
      setStatus("");
      closeAssign();
      await loadData();
      showToast("Evaluator assigned successfully.", "success");
    } catch (e) {
      const msg =
        e.response?.data?.detail ||
        e.response?.data?.error ||
        "Failed to assign evaluation (tip: an evaluator can have max 2 projects).";
      showToast(msg, "error");
      setStatus("");
    }
  };

  const handleRemove = async (projectId) => {
    if (!window.confirm("Remove evaluator from this project?")) return;
    try {
      await api.delete(`/api/assign-evaluation/${projectId}/`);
      await loadData();
      showToast("Evaluator removed.", "success");
    } catch (e) {
      const msg =
        e.response?.data?.detail ||
        e.response?.data?.error ||
        "Failed to remove evaluator.";
      showToast(msg, "error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Projects</h2>

      {status && <div className={styles.status}>{status}</div>}

      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : projects.length === 0 ? (
        <div className={styles.empty}>No projects found.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Supervisor</th>
                <th>Co-Supervisor</th>
                <th>Members</th>
                <th>Evaluator</th>
                <th>Assigned On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const supervisorName =
                  p?.supervisor?.full_name || p?.supervisor?.email || "—";

                const members =
                  [p.group_member_1, p.group_member_2, p.group_member_3]
                    .filter(Boolean)
                    .map(
                      (m) => m.full_name || m.email || m.registration_id || m.id
                    )
                    .join(", ") || "—";

                const evaluatorCell = p.evaluation?.evaluator_name
                  ? `${p.evaluation.evaluator_name} (${p.evaluation.evaluator_email})`
                  : "Unassigned";

                const assignedBadge = p.evaluation ? (
                  <span className={`${styles.badge} ${styles.badgeSuccess}`}>
                    Assigned to{" "}
                    {p.evaluation.evaluator_name ||
                      p.evaluation.evaluator_email ||
                      "Supervisor"}{" "}
                    on{" "}
                    {p.evaluation.assigned_at
                      ? new Date(p.evaluation.assigned_at).toLocaleString()
                      : "—"}
                  </span>
                ) : (
                  <span className={`${styles.badge} ${styles.badgeInfo}`}>
                    Not assigned yet
                  </span>
                );

                return (
                  <tr key={p.id}>
                    <td className={styles.titleCell}>{p.project_title}</td>
                    <td>{supervisorName}</td>
                    <td>{p.co_supervisor_email || "—"}</td>
                    <td className={styles.membersCell}>{members}</td>
                    <td>{evaluatorCell}</td>
                    <td>{assignedBadge}</td>
                    <td>
                      {!p.evaluation ? (
                        <button
                          className={styles.assignBtn}
                          onClick={() => openAssign(p.id)}
                        >
                          Assign
                        </button>
                      ) : (
                        <>
                          <button
                            className={styles.changeBtn}
                            onClick={() => openAssign(p.id)}
                          >
                            Change
                          </button>
                          <button
                            className={styles.removeBtn}
                            onClick={() => handleRemove(p.id)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {assigningId && (
        <div className={styles.modalBackdrop} onClick={closeAssign}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Assign Evaluator</h3>
            <label className={styles.label}>Select Supervisor</label>
            <select
              className={styles.select}
              value={selectedEvaluator}
              onChange={(e) => setSelectedEvaluator(e.target.value)}
            >
              <option value="">Choose…</option>
              {supervisors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name || s.email} — {s.email}
                </option>
              ))}
            </select>

            <div className={styles.hint}>
              Policy: each evaluator can be assigned to <strong>max 2</strong> projects.
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeAssign}>
                Cancel
              </button>
              <button
                className={styles.primaryBtn}
                onClick={handleAssign}
                disabled={!selectedEvaluator}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div
          className={`${styles.toast} ${
            toast.type === "success"
              ? styles.toastSuccess
              : toast.type === "error"
              ? styles.toastError
              : styles.toastInfo
          }`}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}

export default AllProjects;
