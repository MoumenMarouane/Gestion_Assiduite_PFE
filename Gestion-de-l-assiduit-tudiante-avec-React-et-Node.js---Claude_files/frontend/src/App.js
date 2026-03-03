import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  createTheme, 
  ThemeProvider, 
  CssBaseline, 
  IconButton, 
  Box 
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/common/Layout';

// Pages imports (garder tes imports actuels...)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfessorDashboard from './pages/professor/Dashboard';
import CourseManagement from './pages/professor/CourseManagement';
import AttendanceQR from './pages/professor/AttendanceQR';
import StudentProfile from './pages/professor/StudentProfile';
import GradeAdaptation from './pages/professor/GradeAdaptation';
import Statistics from './pages/professor/Statistics';
import ChatBotDecisions from './pages/professor/ChatBotDecisions';
import StudentDashboard from './pages/student/Dashboard';
import ScanQR from './pages/student/ScanQR';
import MyAbsences from './pages/student/MyAbsences';
import MyGrades from './pages/student/MyGrades';
import MyCalendar from './pages/student/MyCalendar';

function App() {
  // 1. État pour le mode (clair ou sombre)
  const [mode, setMode] = useState('light');

  // 2. Configuration du thème dynamique
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1a237e' : '#90caf9',
      },
      background: {
        default: mode === 'light' ? '#f4f6f8' : '#0a1929',
        paper: mode === 'light' ? '#ffffff' : '#112233',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' }, // Évite le dégradé gris par défaut de MUI en dark
        },
      },
    },
  }), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      {/* 3. CssBaseline applique le fond sombre au body automatiquement */}
      <CssBaseline />
      
      <Router>
        <AuthProvider>
          {/* Bouton de bascule flottant (pour l'instant, tu pourras le mettre dans ta Navbar plus tard) */}
          <Box sx={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
            <IconButton onClick={toggleColorMode} sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
              {mode === 'dark' ? <Brightness7 color="warning" /> : <Brightness4 color="primary" />}
            </IconButton>
          </Box>

          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes protégées - Professeur */}
            <Route path="/professor" element={
              <PrivateRoute allowedRoles={['PROFESSEUR', 'ADMIN']}>
                <Layout />
              </PrivateRoute>
            }>
              <Route index element={<ProfessorDashboard />} />
              <Route path="dashboard" element={<ProfessorDashboard />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="attendance" element={<AttendanceQR />} />
              <Route path="students/:id" element={<StudentProfile />} />
              <Route path="grades" element={<GradeAdaptation />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="chatbot" element={<ChatBotDecisions />} />
            </Route>
            
            {/* Routes protégées - Étudiant */}
            <Route path="/student" element={
              <PrivateRoute allowedRoles={['ETUDIANT']}>
                <Layout />
              </PrivateRoute>
            }>
              <Route index element={<StudentDashboard />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="scan" element={<ScanQR />} />
              <Route path="absences" element={<MyAbsences />} />
              <Route path="grades" element={<MyGrades />} />
              <Route path="calendar" element={<MyCalendar />} />
            </Route>
            
            {/* Redirection par défaut */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;