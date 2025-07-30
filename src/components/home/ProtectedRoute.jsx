// import React from 'react'
// import { useEffect, useState } from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'
// import { jwtDecode } from "jwt-decode";
// import axios from 'axios';

// const ProtectedRoute = ({children}) => {
//   const Navigate = useNavigate();
//   const [user, setUser] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     if(token){
//       // setUser(true);
//       // console.log('token is present')
//       // console.log(token)
//       //check if access token is valid or not
//       // if valid set user to true
//       //if false use refresh token to get new access token and set user to true
//       const {exp} = jwtDecode(token);
//       if (exp*1000 < new Date().getTime()) {
//          // refreshToken(); 
//         //use refresh token to get new access token
//       }
//       else{
//         console.log(exp);
//         setUser(true);
//       }
//     }
//     else{
//       setUser(false);
//     }
//   }, [])
//   const refreshToken = async () => {
//     try{
//       const response = await axios.post('http://localhost:8000/api/token/refresh/', {
//         refresh: localStorage.getItem('refresh')
//       })
//       localStorage.setItem('access', response.data.access);
//       // localStorage.setItem('refresh', response.data.refresh);
//       console.log('access token refreshed')
//       setUser(true);
//     }
//     catch(error){
//       setUser(false);
//     }
//   }
//   if(user===null){
//     return (
//       <>
//       <div>loading.....</div>
//       </>
//     );
//   }
//   // return (
//   //  <>
//   //  {console.log(user)}
//   //  {user ? children : <Navigate to="/admin-dashboard" />}
//   //  </>
//   // )
// }

// export default ProtectedRoute

// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';

// const ProtectedRoute = ({ children }) => {
//   const [authorized, setAuthorized] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     const refresh = localStorage.getItem('refresh');
//     const email = localStorage.getItem('identifier'); // 💡 Save this during login

//     const validateAndRoute = async () => {
//       let accessToken = token;

//       if (!accessToken) return setAuthorized(false);

//       const { exp } = jwtDecode(accessToken);
//       const now = Date.now();

//       if (exp * 1000 < now) {
//         // 🔄 Token expired → refresh
//         try {
//           const res = await axios.post('http://127.0.0.1:8000/token/refresh/', {
//             refresh,
//           });
//           accessToken = res.data.access;
//           localStorage.setItem('access', accessToken);
//         } catch (err) {
//           return setAuthorized(false);
//         }
//       }

//       // 🕵️‍♀️ Get Role
//       try {
//         const roleRes = await axios.get(`http://127.0.0.1:8000/api/get-role/`);
//         const role = roleRes.data.role;
//         localStorage.setItem('role', role);

//         // 🚦 Final Routing Based on Role
//         if (role === 'admin') window.location.href = '/admin-dashboard';
//         else if (role === 'student') window.location.href = '/student-dashboard';
//         else if (role === 'supervisor') window.location.href = '/supervisor-dashboard';
//         else return setAuthorized(false);

//         setAuthorized(true);
//       } catch (error) {
//         setAuthorized(false);
//       }
//     };

//     validateAndRoute();
//   }, []);

//   if (authorized === null) return <div>Loading...</div>;
//   return authorized ? children : <Navigate to="/admin-dashboard" />;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ allowedRole, children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const validate = async () => {
      const refresh = localStorage.getItem('refresh');
      let access = localStorage.getItem('access');

      if (!access || jwtDecode(access).exp * 1000 < Date.now()) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
          access = res.data.access;
          localStorage.setItem('access', access);
        } catch {
          return setAuthorized(false);
        }
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/api/get-role/', {
          headers: { Authorization: `Bearer ${access}` },
        });
        setAuthorized(res.data.role === allowedRole);
      } catch {
        setAuthorized(false);
      }
    };

    validate();
  }, [allowedRole]);

  if (authorized === null) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
