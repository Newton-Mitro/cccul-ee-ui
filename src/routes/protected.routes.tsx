import useLoggedInUser from 'common/hooks/useLoggedInUser';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoutes({ children }: any): any {
  const [users, isLoading] = useLoggedInUser();
  const location = useLocation();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (users) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}

export default ProtectedRoutes;
