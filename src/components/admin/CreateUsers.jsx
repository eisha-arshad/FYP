// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./CreateUsers.module.css";

// function CreateUser() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     registration_id: "",
//     department: "",
//     program: "",
//     role: "",
//     email: "",
//     password: "",
//   });
//   const [status, setStatus] = useState({ text: "", kind: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEdit = !!id;
//   const token = useMemo(() => localStorage.getItem("access"), []);

//   useEffect(() => {
//     if (!isEdit) return;
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           `http://127.0.0.1:8000/api/manage-users/${id}/`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const data = res.data || {};
//         const [first = "", ...rest] = (data.full_name || "").trim().split(" ");
//         setFormData({
//           first_name: first,
//           last_name: rest.join(" "),
//           registration_id: data.registration_id || "",
//           department: data.department || "",
//           program: data.program || "",
//           role: data.role || "",
//           email: data.email || "",
//           password: "",
//         });
//       } catch {
//         setStatus({ text: "Failed to load user.", kind: "err" });
//       }
//     };
//     fetchUser();
//   }, [id, isEdit, token]);

//   const handleChange = (e) =>
//     setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

//   const validate = () => {
//     if (!formData.first_name.trim() || !formData.last_name.trim())
//       return "First and last name are required.";
//     if (!formData.registration_id.trim()) return "Registration ID is required.";
//     if (!formData.department.trim()) return "Department is required.";
//     if (!formData.program.trim()) return "Program is required.";
//     if (!formData.role) return "Role is required.";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       return "Please enter a valid email.";
//     if (!isEdit && !formData.password.trim())
//       return "Password is required for new user.";
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus({ text: "", kind: "" });

//     const err = validate();
//     if (err) return setStatus({ text: err, kind: "err" });

//     const payload = {
//       ...formData,
//       full_name: `${formData.first_name} ${formData.last_name}`.trim(),
//       username: formData.email,
//     };
//     if (isEdit && !payload.password) delete payload.password;

//     try {
//       if (isEdit) {
//         await axios.put(
//           `http://127.0.0.1:8000/api/manage-users/${id}/`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setStatus({ text: "User updated!", kind: "ok" });
//       } else {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/api/create-user/",
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (res.status === 201) setStatus({ text: "User created!", kind: "ok" });
//       }
//       setTimeout(() => navigate("/manage-users"), 600);
//     } catch (error) {
//       const msg =
//         error.response?.data?.detail ||
//         error.response?.data?.error ||
//         "Failed to save user.";
//       setStatus({ text: msg, kind: "err" });
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>{isEdit ? "Edit User" : "Create User"}</h2>

//       <form onSubmit={handleSubmit} className={styles.card}>
//         {/* Name fields */}
//         <div className={styles.grid2}>
//           <div className={styles.field}>
//             <label>First Name</label>
//             <input
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               placeholder="e.g., Ali"
//               required
//             />
//           </div>
//           <div className={styles.field}>
//             <label>Last Name</label>
//             <input
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               placeholder="e.g., Raza"
//               required
//             />
//           </div>
//         </div>

//         {/* Registration + Department */}
//         <div className={styles.grid2}>
//           <div className={styles.field}>
//             <label>Registration ID</label>
//             <input
//               name="registration_id"
//               value={formData.registration_id}
//               onChange={handleChange}
//               placeholder="e.g., FA20-BSE-123"
//               required
//             />
//           </div>
//           <div className={styles.field}>
//             <label>Department</label>
//             <input
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               placeholder="e.g., Computer Science"
//               required
//             />
//           </div>
//         </div>

//         {/* Program + Role */}
//         <div className={styles.grid2}>
//           <div className={styles.field}>
//             <label>Program</label>
//             <input
//               name="program"
//               value={formData.program}
//               onChange={handleChange}
//               placeholder="e.g., BSSE"
//               required
//             />
//           </div>
//           <div className={styles.field}>
//             <label>Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="student">Student</option>
//               <option value="supervisor">Supervisor</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//         </div>

//         {/* Email */}
//         <div className={styles.field}>
//           <label>Email</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="e.g., name@uol.edu.pk"
//             required
//           />
//         </div>

//         {/* Password only for create */}
//         {!isEdit && (
//           <div className={styles.field}>
//             <label>Password</label>
//             <div className={styles.passwordRow}>
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter a strong password"
//                 required
//               />
//               <button
//                 type="button"
//                 className={styles.toggleBtn}
//                 onClick={() => setShowPassword((s) => !s)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Action buttons */}
//         <div className={styles.actions}>
//           <button type="submit" className={styles.primary}>
//             {isEdit ? "Update User" : "Create User"}
//           </button>
//           <button
//             type="button"
//             className={styles.secondary}
//             onClick={() => navigate("/manage-users")}
//           >
//             Back
//           </button>
//         </div>

//         {/* Status message */}
//         {!!status.text && (
//           <p
//             className={`${styles.status} ${
//               status.kind === "ok"
//                 ? styles.statusOk
//                 : status.kind === "err"
//                 ? styles.statusErr
//                 : ""
//             }`}
//           >
//             {status.text}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default CreateUser;
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CreateUsers.module.css";

// ========== ROLE-BASED EMAIL RULES ==========
// NOTE: In rules, we consider a valid email if EITHER:
// 1) local-part starts with role (e.g., "admin..." before "@"), OR
// 2) domain contains role as subdomain (e.g., "@admin.example.com").
//
// ⬇ If you have strict domains, replace these tests accordingly.
// Example strict: (role === 'student') => /@student\.uol\.edu\.pk$/i.test(email)
const emailMatchesRole = (role, email) => {
  if (!role || !email) return false;

  const lower = String(email).toLowerCase().trim();
  const [localPart, domain = ""] = lower.split("@");

  const startsWithRole = localPart?.startsWith(role);          // e.g., admin.ali@...
  const domainHasRole  = domain.includes(`${role}.`);          // e.g., @admin.example.com

  return startsWithRole || domainHasRole;
};

function CreateUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    registration_id: "",
    department: "",
    program: "",
    role: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ text: "", kind: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const token = useMemo(() => localStorage.getItem("access"), []);

  useEffect(() => {
    if (!isEdit) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/manage-users/${id}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data || {};
        const [first = "", ...rest] = (data.full_name || "").trim().split(" ");
        setFormData({
          first_name: first,
          last_name: rest.join(" "),
          registration_id: data.registration_id || "",
          department: data.department || "",
          program: data.program || "",
          role: data.role || "",
          email: data.email || "",
          password: "",
        });
      } catch {
        setStatus({ text: "Failed to load user.", kind: "err" });
      }
    };
    fetchUser();
  }, [id, isEdit, token]);

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.first_name.trim() || !formData.last_name.trim())
      return "First and last name are required.";
    if (!formData.registration_id.trim()) return "Registration ID is required.";
    if (!formData.department.trim()) return "Department is required.";
    if (!formData.program.trim()) return "Program is required.";
    if (!formData.role) return "Role is required.";

    // Basic email syntax
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email address.";

    // ROLE-BASED email check
    if (!emailMatchesRole(formData.role, formData.email)) {
      // Helpful message
      // You can customize per role examples here:
      const examples = {
        admin: "admin.name@your-domain.com or name@admin.your-domain.com",
        student: "student.id@your-domain.com or name@student.your-domain.com",
        supervisor: "supervisor.name@your-domain.com or name@supervisor.your-domain.com",
      };
      return `Email must match the selected role "${formData.role}". E.g., ${examples[formData.role] || "role@domain format"}.`;
    }

    if (!isEdit && !formData.password.trim())
      return "Password is required for new user.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "", kind: "" });

    const err = validate();
    if (err) return setStatus({ text: err, kind: "err" });

    const payload = {
      ...formData,
      full_name: `${formData.first_name} ${formData.last_name}`.trim(),
      username: formData.email,
    };
    if (isEdit && !payload.password) delete payload.password;

    try {
      if (isEdit) {
        await axios.put(
          `http://127.0.0.1:8000/api/manage-users/${id}/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus({ text: "User updated!", kind: "ok" });
      } else {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/create-user/",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) {
          setStatus({ text: "User created!", kind: "ok" });
          // Stay on page & clear form for next entry
          setFormData({
            first_name: "",
            last_name: "",
            registration_id: "",
            department: "",
            program: "",
            role: "",
            email: "",
            password: "",
          });
        }
      }
    } catch (error) {
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "Failed to save user.";
      setStatus({ text: msg, kind: "err" });
    }
  };

  // Dynamic helper under email field (optional, UX aid)
  const roleHint = (() => {
    const r = formData.role;
    if (!r) return "Select a role first.";
    if (r === "admin")
      return "Allowed: local-part starts with 'admin' OR domain has 'admin.' (e.g., admin.ali@..., ali@admin.example.com)";
    if (r === "student")
      return "Allowed: local-part starts with 'student' OR domain has 'student.'";
    if (r === "supervisor")
      return "Allowed: local-part starts with 'supervisor' OR domain has 'supervisor.'";
    return "";
  })();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isEdit ? "Edit User" : "Create User"}</h2>

      <form onSubmit={handleSubmit} className={styles.card} autoComplete="on">
        {/* Name */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="e.g., Ali"
              autoComplete="given-name"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="e.g., Raza"
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        {/* Registration + Department */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="registration_id">Registration ID</label>
            <input
              id="registration_id"
              name="registration_id"
              value={formData.registration_id}
              onChange={handleChange}
              placeholder="e.g., FA20-BSE-123"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              required
            />
          </div>
        </div>

        {/* Program + Role */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="program">Program</label>
            <input
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              placeholder="e.g., BSSE"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Email + hint */}
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., admin.name@your-domain.com"
            autoComplete="email"
            required
          />
          <small className={styles.hint}>{roleHint}</small>
        </div>

        {/* Password only for create */}
        {!isEdit && (
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordRow}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        )}

        {/* Actions (Back removed) */}
        <div className={styles.actions}>
          <button type="submit" className={styles.primary}>
            {isEdit ? "Update User" : "Create User"}
          </button>
        </div>

        {/* Status */}
        {!!status.text && (
          <p
            className={`${styles.status} ${
              status.kind === "ok"
                ? styles.statusOk
                : status.kind === "err"
                ? styles.statusErr
                : ""
            }`}
          >
            {status.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreateUser;
