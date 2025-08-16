


// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const ProtectedRoute = ({ allowedRole, children }) => {
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const validate = async () => {
//       const refresh = localStorage.getItem('refresh');
//       let access = localStorage.getItem('access');

//       if (!access || jwtDecode(access).exp * 1000 < Date.now()) {
//         try {
//           const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
//           access = res.data.access;
//           localStorage.setItem('access', access);
//         } catch {
//           return setAuthorized(false);
//         }
//       }

//       try {
//         const res = await axios.get('http://127.0.0.1:8000/api/get-role/', {
//           headers: { Authorization: `Bearer ${access}` },
//         });
//         setAuthorized(res.data.role === allowedRole);
//       } catch {
//         setAuthorized(false);
//       }
//     };

//     validate();
//   }, [allowedRole]);

//   if (authorized === null) return <div>Loading...</div>;
//   if (!authorized) return <Navigate to="/" />;
//   return children;
// };

// export default ProtectedRoute;

import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE = 'http://127.0.0.1:8000';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token); // seconds since epoch
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ allowedRole, children }) => {
  const [authorized, setAuthorized] = useState(null); // null=loading, true/false
  const location = useLocation();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const validate = async () => {
      let access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');

      // 1) If access missing/expired -> try refresh (only if refresh exists)
      if (!isTokenValid(access)) {
        if (!refresh) {
          if (mounted.current) setAuthorized(false);
          return;
        }
        try {
          const res = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh });
          access = res?.data?.access;
          if (!access) throw new Error('No access in refresh response');
          localStorage.setItem('access', access);
        } catch {
          // refresh failed -> unauth
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          localStorage.removeItem('role');
          if (mounted.current) setAuthorized(false);
          return;
        }
      }

      // 2) Verify role from server using fresh/valid access
      try {
        const roleRes = await axios.get(`${API_BASE}/api/get-role/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        const serverRole = roleRes?.data?.role;
        // optionally keep local copy in sync
        localStorage.setItem('role', serverRole || '');

        if (allowedRole && serverRole !== allowedRole) {
          if (mounted.current) setAuthorized(false);
        } else {
          if (mounted.current) setAuthorized(true);
        }
      } catch {
        if (mounted.current) setAuthorized(false);
      }
    };

    validate();
    return () => {
      mounted.current = false;
    };
  }, [allowedRole]);

  // Loading UI
  if (authorized === null) return <div>Loading...</div>;

  // Deny -> go to /login, replace so back button won't return here
  if (!authorized) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
