import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import BreedRecognitionPage from '@/pages/BreedRecognitionPage';
import LanguageSelectionPage from '@/pages/LanguageSelectionPage';
import DashboardPage from '@/pages/DashboardPage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/language" element={<LanguageSelectionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/breed-recognition" element={<BreedRecognitionPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;