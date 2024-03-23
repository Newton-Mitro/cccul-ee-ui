import AuthenticatedTemplate from 'authenticated_pages/AuthenticatedTemplate';
import HomePage from 'authenticated_pages/Info/home/HomePage';
import ExamPaper from 'authenticated_pages/exam-paper/ExamPaper';
import AuthUserContext, {
  AuthUserContextType,
} from 'common/context/AuthUserContext';
import { AnimatePresence } from 'framer-motion';
import PublicTemplate from 'pages/PublicTemplate';
import LoginPage from 'pages/login/LoginPage';
import { useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const location = useLocation();
  const { authUser } = useContext<AuthUserContextType>(AuthUserContext);

  return (
    <div className={``}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PublicTemplate />}>
            <Route index element={<LoginPage />} />
          </Route>
          {authUser && (
            <Route path="auth" element={<AuthenticatedTemplate />}>
              <Route path="home" element={<HomePage />} />
              <Route path="exam-paper" element={<ExamPaper />} />
            </Route>
          )}
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
