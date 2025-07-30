// import { useState } from 'react'

// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
    
//   )
// }

// export default App


import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Login from './components/home/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import CreateUsers from './components/admin/CreateUsers';
import ManageUsers from './components/admin/ManageUsers';
import SupervisorDashboard from './components/supervisor/SupervisorDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import ProtectedRoute from './components/home/ProtectedRoute';


import './App.css';

function App() {


  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/admin-dashboard" element={
        <ProtectedRoute  allowedRole="admin">
          <AdminDashboard/>
        </ProtectedRoute> } >
      <Route path="create-users" element={<CreateUsers/>} />
      <Route path="manage-users" element={<ManageUsers/>} />
      </Route>


      <Route path="/supervisor-dashboard" element={
        <ProtectedRoute allowedRole="supervisor">
          <SupervisorDashboard/>
        </ProtectedRoute>
      } />
      <Route path="/student-dashboard" element={
       <ProtectedRoute allowedRole="student">
         <StudentDashboard />
       </ProtectedRoute>
        } />
    </Routes>
  );
}

export default App