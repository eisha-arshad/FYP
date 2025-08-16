// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./MyProjectDetail.module.css";

// function MyProjectDetail() {
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjectForStudent = async () => {
//       const token = localStorage.getItem("access");

//       if (!token) {
//         setError("No access token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const roleRes = await axios.get("http://127.0.0.1:8000/api/get-role/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (roleRes.data.role !== "student") {
//           setError("Access denied. You are not a student.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://127.0.0.1:8000/api/student-project/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("📦 Full Project Response:", res.data);
//         setProject(res.data);
//       } catch (err) {
//         console.error("❌ Failed to fetch student project:", err);

//         if (err.response?.status === 403) {
//           setError("Access forbidden.");
//         } else if (err.response?.status === 404) {
//           setError("No project found for this student.");
//         } else {
//           setError("Something went wrong while fetching project data.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjectForStudent();
//   }, []);

//   if (loading) return <p>Loading project details...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!project) return null;

//   const {
//     project_title,
//     created_at,
//     supervisor,
//     co_supervisor_email,
//     group_members = [],
//   } = project;

//   return (
//     <div className={styles.container}>
//       <h2>📁 My Project Details</h2>

//       <div className={styles.projectBox}>
//         <p><strong>Title:</strong> {project_title || "N/A"}</p>
//         <p>
//           <strong>Supervisor:</strong>{" "}
//           {supervisor?.full_name?.trim() || supervisor?.email || "N/A"}
//         </p>
//         <p><strong>Co-Supervisor:</strong> {co_supervisor_email || "N/A"}</p>
//         <p><strong>Created At:</strong> {created_at ? new Date(created_at).toLocaleString() : "N/A"}</p>
//       </div>

//       <h3>👥 Group Members</h3>
//       <div className={styles.groupList}>
//         {group_members.length > 0 ? (
//           group_members.map((member, index) => (
//             <div key={index} className={styles.memberCard}>
//               <p><strong>Group Member {index + 1}</strong></p>
//               <ul>
//                 <li><strong>Name:</strong> {member?.full_name?.trim() || member?.email || "N/A"}</li>
//                 <li><strong>SAP ID:</strong> {member?.registration_id || "N/A"}</li>
//                 <li><strong>Email:</strong> {member?.email || "N/A"}</li>
//                 <li><strong>Program:</strong> {member?.program || "N/A"}</li>
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p>No group members found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyProjectDetail;



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./MyProjectDetail.module.css";

function MyProjectDetail() {
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = useMemo(() => localStorage.getItem("access"), []);

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchProjectForStudent = async () => {
      if (!token) {
        setError("No access token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // ensure this is a student
        const roleRes = await api.get("/api/get-role/");
        if (roleRes.data.role !== "student") {
          setError("Access denied. You are not a student.");
          setLoading(false);
          return;
        }

        // student project
        const res = await api.get("/api/student-project/");
        const proj = res.data;
        setProject(proj);

        // fetch comments & meetings (if we have a project id)
        if (proj?.id) {
          const [cRes, mRes] = await Promise.all([
            api.get(`/api/projects/${proj.id}/comments/`).catch(() => ({ data: [] })),
            api.get(`/api/projects/${proj.id}/meetings/`).catch(() => ({ data: [] })),
          ]);
          setComments(cRes.data || []);
          setMeetings(mRes.data || []);
        }
      } catch (err) {
        console.error("❌ Failed to fetch student project:", err);
        if (err.response?.status === 403) setError("Access forbidden.");
        else if (err.response?.status === 404) setError("No project found for this student.");
        else setError("Something went wrong while fetching project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectForStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!project) return null;

  // Normalize members: support either group_members[] or group_member_1..3
  const members =
    project.group_members && Array.isArray(project.group_members)
      ? project.group_members
      : [project.group_member_1, project.group_member_2, project.group_member_3].filter(Boolean);

  // Try to read evaluator data if backend embedded it as project.evaluation
  const evaluatorName =
    project?.evaluation?.evaluator_name ||
    project?.evaluation?.evaluator_email ||
    null;

  return (
    <div className={styles.container}>
      <h2>📁 My Project Details</h2>

      <div className={styles.projectBox}>
        <p><strong>Title:</strong> {project.project_title || "N/A"}</p>

        <p>
          <strong>Supervisor:</strong>{" "}
          {project.supervisor?.full_name?.trim() ||
            project.supervisor?.email ||
            project.supervisor_name || // fallback if serializer only gave name/email strings
            "N/A"}
        </p>

        <p><strong>Co-Supervisor:</strong> {project.co_supervisor_email || "N/A"}</p>

        <p>
          <strong>Evaluator:</strong>{" "}
          {evaluatorName ? (
            <span className={styles.badgeSuccess}>{evaluatorName}</span>
          ) : (
            <span className={styles.badgeInfo}>Not assigned yet</span>
          )}
        </p>

        <p>
          <strong>Created At:</strong>{" "}
          {project.created_at ? new Date(project.created_at).toLocaleString() : "N/A"}
        </p>
      </div>

      <h3>👥 Group Members</h3>
      <div className={styles.groupList}>
        {members.length > 0 ? (
          members.map((member, index) => (
            <div key={member?.id || index} className={styles.memberCard}>
              <p><strong>Group Member {index + 1}</strong></p>
              <ul>
                <li>
                  <strong>Name:</strong>{" "}
                  {member?.full_name?.trim?.() || member?.email || "N/A"}
                </li>
                <li><strong>SAP ID:</strong> {member?.registration_id || "N/A"}</li>
                <li><strong>Email:</strong> {member?.email || "N/A"}</li>
                <li><strong>Program:</strong> {member?.program || "N/A"}</li>
              </ul>
            </div>
          ))
        ) : (
          <p>No group members found.</p>
        )}
      </div>

      <div className={styles.split}>
        {/* Comments (read-only for student) */}
        <section className={styles.panel}>
          <h3>💬 Supervisor Comments</h3>
          {comments.length === 0 ? (
            <p className={styles.muted}>No comments yet.</p>
          ) : (
            <div className={styles.commentList}>
              {comments.map((c) => (
                <div key={c.id || c.created_at} className={styles.commentItem}>
                  <div className={styles.commentMeta}>
                    <b>{c.author_name || "Supervisor"}</b>
                    <span> · {c.created_at ? new Date(c.created_at).toLocaleString() : ""}</span>
                  </div>
                  <div className={styles.commentText}>{c.text}</div>
                </div>
              ))}
            </div>
          )}
          <p className={styles.note}>* Comments are posted by your supervisor and visible to you here.</p>
        </section>

        {/* Meetings */}
        <section className={styles.panel}>
          <h3>📅 Meetings</h3>
          {meetings.length === 0 ? (
            <p className={styles.muted}>No meetings scheduled yet.</p>
          ) : (
            <div className={styles.meetingList}>
              {meetings.map((m) => (
                <div key={m.id || m.starts_at} className={styles.meetingItem}>
                  <div className={styles.meetingTitle}>{m.title || "Meeting"}</div>
                  <div className={styles.meetingMeta}>
                    <span><b>Start:</b> {m.starts_at ? new Date(m.starts_at).toLocaleString() : "—"}</span>
                    {m.ends_at && <span> · <b>End:</b> {new Date(m.ends_at).toLocaleString()}</span>}
                    {m.location && <span> · <b>Where:</b> {m.location}</span>}
                  </div>
                  {m.notes && <div className={styles.meetingNotes}>{m.notes}</div>}
                </div>
              ))}
            </div>
          )}
          <p className={styles.note}>* Meetings are created by your supervisor and appear here automatically.</p>
        </section>
      </div>
    </div>
  );
}

export default MyProjectDetail;
