import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
      const userInfo = localStorage.getItem('user');
      const userIsAuthenticated = Boolean(userInfo);
      
      if (userIsAuthenticated && location.pathname === '/') {
        navigate('/dashboard');
        return;
      }
  
      // Redirect to login page if user is not authenticated and not already on the login page
      if (!userIsAuthenticated && location.pathname !== '/') {
        navigate('/');
        return;
      }
    }, [navigate, location.pathname]);
  
    return <>{children}</>;
  };
  
  export default AuthWrapper;
  