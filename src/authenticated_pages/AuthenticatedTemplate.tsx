import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function AuthenticatedTemplate() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AuthenticatedTemplate;
