import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DecksProvider } from './context/DecksContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Decks from './pages/Decks';
import DeckViewer from './pages/DeckViewer';
import Test from './pages/Test';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DecksProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/decks"
              element={
                <ProtectedRoute>
                  <Decks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deck/:deckId"
              element={
                <ProtectedRoute>
                  <DeckViewer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:deckId"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </DecksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
