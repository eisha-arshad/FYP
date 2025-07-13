// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/pages/landing/Landing';
import SignupStudent from './components/pages/signup/Signup-st.jsx';
import SupervisorSignUp from './components/pages/signup/Signup-sv.jsx';
import AdminSignUp from './components/pages/signup/Signup-ad.jsx';
import Login from './components/pages/login/Login.jsx';
import ForgotPassword from './components/pages/login/Forgotp.jsx';
import StudentAgreement from './components/pages/signup/Agreement-st.jsx';

import Studentdb from './components/pages/dashboard/Stfiles/Dashboard-st.jsx';
import SubmitProject from './components/pages/dashboard/stfiles/Submitproject.jsx';
import Feedback from './components/pages/dashboard/stfiles/Feedback.jsx';
import Progress from './components/pages/dashboard/stfiles/Progress.jsx';
import Deadlines from './components/pages/dashboard/stfiles/Deadlines.jsx';
import Dprojects from './components/pages/dashboard/stfiles/Doneprojects.jsx';
import Formats from './components/pages/dashboard/stfiles/Formats.jsx';
import Stprofile from './components/pages/dashboard/stfiles/Profile-st.jsx';
import DashboardHome from './components/pages/dashboard/stfiles/Dashboard-hm.jsx';
// import ChatBox from './components/pages/dashboard/stfiles/ChatBox.jsx';

import Supervisordb from './components/pages/dashboard/spfiles/Dashboard-sp.jsx';
import Submissions from './components/pages/dashboard/spfiles/Submissions.jsx';
import NotifyStudents from './components/pages/dashboard/spfiles/NotifyStudents.jsx';
import SupervisorDeadlines from './components/pages/dashboard/spfiles/Supervisordeadlines.jsx';
import SupervisorReports from './components/pages/dashboard/spfiles/Reports.jsx';
import SupervisorProfile from './components/pages/dashboard/spfiles/Profile-sp.jsx';
import ReviewProjects from './components/pages/dashboard/spfiles/Reviewprojects.jsx';
import ProposalGuidelines from './components/pages/dashboard/spfiles/Proposalguidelines.jsx';
import SupervisorChatBox from './components/pages/dashboard/spfiles/Chatbox-sp.jsx';

import AdminDashboard from './components/pages/dashboard/adfiles/AdminDashboard.jsx';
import ManageStudents from './components/pages/dashboard/adfiles/ManageStudents.jsx';
import ManageSupervisors from './components/pages/dashboard/adfiles/ManageSupervisors.jsx';
import AdSubmissions from './components/pages/dashboard/adfiles/AdSubmissions.jsx';
import DeadlinesManagement from './components/pages/dashboard/adfiles/DeadlinesManagement.jsx';
import FeedbackTracking from './components/pages/dashboard/adfiles/FeedbackTracking.jsx';
import ReportsAnalytics from './components/pages/dashboard/adfiles/ReportsAnalytics.jsx';
import Announcements from './components/pages/dashboard/adfiles/Announcements.jsx';
import AdminProfile from './components/pages/dashboard/adfiles/AdminProfile.jsx';


function App() {
  return (
 
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/student" element={<SignupStudent />} />
      <Route path="/signup/supervisor" element={<SupervisorSignUp />} />
      <Route path="/signup/admin" element={<AdminSignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/student-agreement" element={<StudentAgreement />} />

      <Route path="/student-dashboard" element={<Studentdb />}>
      <Route index element={<DashboardHome />} />
      {/* <Route index element={<div><h2>Select an option from the sidebar</h2></div>} /> */}
      <Route path="submit-project" element={<SubmitProject />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="progress" element={<Progress />} />
      <Route path="deadlines" element={<Deadlines />} />
      <Route path="done-projects" element={<Dprojects />} />
      <Route path="formats" element={<Formats />} />
      <Route path="profile-st" element={<Stprofile />} />
      {/* <Route path="chat-st" element={<ChatBox />} /> */}
      </Route>
    
      <Route path="/supervisor-dashboard" element={<Supervisordb />} >
      <Route index element={<DashboardHome />} />
      <Route path="submissions" element={<Submissions/>} />
      <Route path="notifications" element={<NotifyStudents />} />
      <Route path="deadlines" element={<SupervisorDeadlines />} />
      <Route path="reports" element={<SupervisorReports />} />
      <Route path="review-projects" element={<ReviewProjects />} />
      <Route path="proposal-guidelines" element={<ProposalGuidelines />} />
      <Route path="profile-sp" element={<SupervisorProfile/>} />
      <Route path="chat-sp" element={<SupervisorChatBox />} />
      </Route>    
      

      <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-supervisors" element={<ManageSupervisors />} />
          <Route path="submissions" element={<AdSubmissions />} />
          <Route path="deadlines" element={<DeadlinesManagement />} />
          <Route path="feedback" element={<FeedbackTracking/>} />
          <Route path="reports" element={<ReportsAnalytics />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="settings" element={<AdminProfile />} />
        </Route>
    
    </Routes>
  
  );
}

export default App;
