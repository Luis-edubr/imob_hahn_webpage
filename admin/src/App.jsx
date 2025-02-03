import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout.jsx';
import Login from './pages/login/index.jsx';
import Dashboard from './pages/dashboard/index.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Create from './pages/create/index.jsx';
import Edit from './pages/edit/index.jsx';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><AdminLayout><Create /></AdminLayout></ProtectedRoute>} />
      <Route path="/edit/:tipo/:id" element={<ProtectedRoute><AdminLayout><Edit /></AdminLayout></ProtectedRoute>} />
    </Routes>
  </Router>
  );
}

export default App;